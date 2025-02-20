<template>
    <div>
        <ul v-if="data?.grid" ref="grid" class="home-grid-items-blur">
            <GridFlexItem v-for="item in data.grid" :key="item.slug?.current" :item="item"
                @set-active="setActiveProject" @clear-active="clearActiveProject" />
        </ul>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
import { useActiveProjectStore } from '@/stores/activeProject';
import GridFlexItem from '@/components/Home/GridFlexItem.vue';

const query = `
  *[_type == "homePage"]{
      "grid": grid[]{
         _type == "single" => {
              _type,
              "_id": _key, 
              "url": img.asset->url,
              "alt": img.asset->altText,
              location,
              title,
              size
          },
         _type == "projectGridItem" => {
            "_type": item->_type,
            "_id": item->_id,
            "featured": item->featured.asset->{
              "url": url,
              "alt": altText
            },
            "customTnail": tnail_custom.asset->{
              "url": url,
              "altText": altText
            },
            width,
            "slug": item->slug,
            "location": item->location,
            "title": item->title,
            "type": item->type,
            "firstProject": item->projects[0]->{
              "img": featured.asset->{
                "url": url,
                "altText": altText
              }
            }
          }
      }
  }[0]
`;

const { data } = await useSanityQuery(query);
const activeProjectStore = useActiveProjectStore();
const router = useRouter();

const grid = ref();
const blurredList = ref(null);

/** Handles setting the active project */
function setActiveProject(project) {
    if (!project?._id) return;
    activeProjectStore.setActiveProject(project.title, project.location, project._id);
    applyBlurEffect();
}

/** Clears the active project */
function clearActiveProject() {
    activeProjectStore.clearActiveProject();
    removeBlurEffect();
}

/** Applies the blur effect */
function applyBlurEffect() {
    if (!grid.value) return;

    const id = activeProjectStore.activeProject?._id;
    const type = activeProjectStore.activeProjectType;

    // Ensure a valid selector is always used
    if (!id && !type) {
        removeBlurEffect();
        return;
    }

    const selector = id
        ? `li:not([data-title="${id}"])`
        : `li:not([data-type="${type}"])`;

    blurredList.value = grid.value.querySelectorAll(selector);

    if (!blurredList.value.length) return;
    blurredList.value.forEach((item) => item.classList.add('blur'));
}

/** Removes the blur effect */
function removeBlurEffect() {
    if (!blurredList.value) return;
    blurredList.value.forEach((item) => item.classList.remove('blur'));
    blurredList.value = null;
}

// Watch for changes and update the blur effect
watch(() => activeProjectStore.activeProject, applyBlurEffect);
watch(() => activeProjectStore.activeProjectType, applyBlurEffect);
onMounted(applyBlurEffect);

// Clear active project when navigating away from the home page
router.beforeEach((to, from, next) => {
    if (from.path === '/' && to.path !== '/') {
        activeProjectStore.clearActiveProject();
    }
    next();
});
</script>

<style lang="scss" scoped>
ul {
    position: relative;
    z-index: 2;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>
