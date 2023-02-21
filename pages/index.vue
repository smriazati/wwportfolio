<template>
  <div class="home-page-wrapper">
    <Suspense>
      <div class="home-grid-main-blur unblur">

        <Head>
          <Title>Home</Title>
          <Meta name="description" :content="data?.seo?.shortDesc" />
          <Meta name="og:img" :content="data?.seo?.img?.url" />
        </Head>
        <main>
          <ul v-if="data?.grid" ref="grid" class="home-grid-items-blur">
            <li v-for="item in data.grid" v-bind:key="item.slug?.current" :class="`type-${item._type} unblur`"
              :data-title="item.title" :data-location="item.location" @mouseover="(e) => { setActiveProject(e) }"
              @mouseout="e => { clearActiveProject(e) }">
              <NuxtLink :to="`/${item._type === 'project' ? 'project' : 'client'}/${item.slug?.current}`">
                <div v-if="item.featured" class="image-wrapper">
                  <img :src="$urlFor(item.featured?.url).url()" :alt="item.img?.alt" loading="lazy" />
                </div>
              </NuxtLink>
            </li>
          </ul>
          <HomeBehindTheScenes></HomeBehindTheScenes>
        </main>
      </div>
    </Suspense>
    <HomeActiveProjectOverlay :title="activeProject.title" :location="activeProject.location">
    </HomeActiveProjectOverlay>

  </div>
</template>

<script setup>
import { ref } from 'vue'
const seoQuery = `
"seo": {
  "shortDesc": seo.description_short,
    "img": {
      "url": seo.featured.asset->url,
      "alt": seo.featured.asset->altText
    }
}
`
const projectQuery = `
_type,
"featured": {
  "url": featured.asset->url,
  "alt": featured.asset->altText
},
slug,
location,
title,
type
`

const query = `
*[_type == "homePage"]{
  ${seoQuery},
  "grid": grid[].item-> {
    ${projectQuery}
  }
}[0]
`
const { data } = await useSanityQuery(query);

const activeProject = ref({
  title: undefined,
  location: undefined
})

function setActiveProject(e) {
  const item = e.target.closest('li');
  const data = item.dataset;
  activeProject.value.title = data.title
  activeProject.value.location = data.location
  addBlurToSiblings(item)
}

function clearActiveProject(e) {
  const item = e.target.closest('li');
  removeBlurFromSiblings(item)
  activeProject.value.title = ''
  activeProject.value.location = ''
}


var getSiblings = function (elem) {
  var siblings = [];
  var sibling = elem.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling
  }
  return siblings;
};

const addBlurToSiblings = (item) => {
  const siblings = getSiblings(item)
  siblings.map(sibling => {
    sibling.classList.add('blur');
  })
}
const removeBlurFromSiblings = (item) => {
  const siblings = getSiblings(item)
  siblings.map(sibling => {
    sibling.classList.remove('blur');
  })
}
definePageMeta({
  layout: "home"
});

</script>

<style lang="scss" scoped>
.home-page-wrapper {
  padding-top: 80px;
}

.home-page-wrapper ul {
  position: relative;
  z-index: 2;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  li {
    padding: 12px;
    margin-bottom: 10vh;

    &.type-project {
      flex: 0 0 50%;
    }

    &.type-client,
    &.type-commission {
      flex: 0 0 25%;
    }
  }

}
</style>