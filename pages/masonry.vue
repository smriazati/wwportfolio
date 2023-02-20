<template>
  <div class="home-page-wrapper">
    <main>
      <div ref="grid" class="masonry-container">
        <MasonryWall :items="data" :column-width="400" :gap="0" :rtl="false" :scroll-container="false">
          <template #default="{ item, index }">
            <div :class="`type-${item.type} content-wrapper`" :data-title="item.title" :data-location="item.location"
              @mouseover="(e) => { setActiveProject(e) }" @mouseout="(e) => { clearActiveProject(e) }">
              <NuxtLink :to="`projects/${item.slug.current}`">
                <div v-if="item.featured" class="image-wrapper">
                  <img :src="$urlFor(item.featured.url).url()" :alt="item.img?.alt" />
                </div>
              </NuxtLink>
            </div>
          </template>
        </MasonryWall>
      </div>
      <section v-if="activeProject.title || activeProject.location" class="active-project-wrapper">
        <div class="text-wrapper">
          <h2>{{ activeProject.title }}</h2>
          <h3>{{ activeProject.location }}</h3>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const projectQuery = `
"featured": {
  "url": featured.asset->url,
  "alt": featured.asset->altText
},
slug,
location,
title,
type
`
const query = groq`*[_type == "project"]|order(orderRank){
${projectQuery}
}`;
const { data, pending } = useSanityQuery(query);

const activeProject = ref({
  title: undefined,
  location: undefined
})
const activeProjectEl = ref()
const grid = ref();
var getSiblings = function () {
  const parent = grid.value;
  const current = activeProjectEl.value
  const items = parent.querySelectorAll('.masonry-item')
  var siblings = [];
  items.forEach(item => {
    if (item.nodeType === 1 && item !== current) {
      siblings.push(item);
    }
  })
  return siblings;
};

const addBlurToSiblings = () => {
  const siblings = getSiblings()
  siblings.map(sibling => {
    sibling.classList.add('blur');
  })
}
const removeBlurFromSiblings = () => {
  const siblings = getSiblings()
  siblings.map(sibling => {
    sibling.classList.remove('blur');
  })
}

const setActiveProjectData = () => {
  const data = activeProjectEl.value.querySelector('.content-wrapper').dataset;
  activeProject.value.title = data.title
  activeProject.value.location = data.location
}

const clearActiveProjectData = () => {
  activeProject.value.title = ''
  activeProject.value.location = ''
}

function setActiveProject(e) {
  activeProjectEl.value = e.target.closest('.masonry-item');
  setActiveProjectData()
  addBlurToSiblings()
}

function clearActiveProject(e) {
  activeProjectEl.value = null;
  clearActiveProjectData()
  removeBlurFromSiblings()
}

</script>

<style lang="scss">
.active-project-wrapper {
  position: fixed;
  z-index: 100;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  .text-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 100;

    >*:first-child {
      text-align: left;
    }

    >*:last-child {
      text-align: right;
    }
  }

}

.home-page-wrapper {
  .unblur {
    transition: 1s ease filter;
  }

  .blur {
    filter: blur(20px);
  }
}

.home-page-wrapper .masonry-container {
  position: relative;
  z-index: 2;
  list-style: none;
}

.type-project {
  width: 50vw;
}

.type-commission {
  width: 15vw;
}

main {
  margin-top: 80px;
}

// .grid-container {
//   min-width: 100%;
//   max-width: 100vw;
//   display: grid;
//   column-gap: 1rem;
//   grid-template-columns: repeat(auto-fit, minmax(22em, 1fr));
//   grid-auto-rows: auto;
// }

// .grid-item {
//   height: fit-content;
// }
</style>