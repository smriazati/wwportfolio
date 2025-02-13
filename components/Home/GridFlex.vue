<template>
    <div>
        <ul v-if="data?.grid" ref="grid" class="home-grid-items-blur">
            <GridFlexItem v-for="item in data.grid" :key="item.slug?.current" :item="item" />
        </ul>
    </div>
</template>

<script setup>
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
  `
const { data } = await useSanityQuery(query);
const activeProjectStore = useActiveProjectStore();

const grid = ref();
const blurredList = ref(null);

watch(activeProjectStore.activeProject, () => {
    const id = activeProjectStore.activeProject?._id;
    if (id) {
        if (!grid.value) return;
        blurredList.value = grid.value.querySelectorAll(`li:not([data-title="${id}"])`);
        if (!blurredList.value) return;
        blurredList.value.forEach((item) => {
            item.classList.add('blur');
        });
    } else {
        if (!blurredList.value) return;
        blurredList.value.forEach((item) => {
            item.classList.remove('blur');
        });
        blurredList.value = null;
    }
});

watch(() => activeProjectStore.activeProjectType, () => {
    const type = activeProjectStore.activeProjectType;
    if (type) {
        if (!grid.value) return;
        blurredList.value = grid.value.querySelectorAll(`li:not([data-type="${type}"])`);
        if (!blurredList.value) return;
        blurredList.value.forEach((item) => {
            item.classList.add('blur');
        });
    } else {
        if (!blurredList.value) return;
        blurredList.value.forEach((item) => {
            item.classList.remove('blur');
        });
        blurredList.value = null;
    }
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