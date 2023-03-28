<template>
  <div class="home-page-wrapper">
    <Suspense>
      <div>

        <Head>
          <Title>Home</Title>
          <Meta name="description" :content="data?.seo?.shortDesc" />
          <Meta name="og:img" :content="data?.seo?.img?.url" />
        </Head>
        <main ref="main">
          <div ref="grid" class="unblur blur">
            <HomeGridFlex></HomeGridFlex>
          </div>
          <HomeBehindTheScenes></HomeBehindTheScenes>
        </main>
      </div>
    </Suspense>
    <HomeActiveProjectOverlay v-if="!isMobile">
    </HomeActiveProjectOverlay>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const seoQuery = `
"seo": {
  "shortDesc": seo.description_short,
    "img": {
      "url": seo.featured.asset->url,
      "alt": seo.featured.asset->altText
    }
}
`

const query = `
*[_type == "homePage"]{
  ${seoQuery}
}[0]
`
const { data } = await useSanityQuery(query);
definePageMeta({
  layout: "home"
});

const grid = ref();
const timer = ref();
const main = ref();

const toggleBlur = () => {
  if (!grid.value) { return }
  if (!grid.value.classList) { return }
  if (grid.value.classList.contains('blur')) {
    grid.value.classList.remove('blur')
  } else {
    grid.value.classList.add('blur')
  }
}

const refreshScrollTrigger = () => {
  ScrollTrigger.refresh()
}

const isMobile = ref();
const checkForMobile = () => {
  if (window.innerWidth > 800) {
    isMobile.value = false
  } else {
    isMobile.value = true
  }
}

onMounted(() => {

  ScrollTrigger.create({
    trigger: grid.value,
    start: `top+=100px top`,
    // markers: true,
    onToggle: toggleBlur,
  });

  timer.value = setTimeout(() => {
    refreshScrollTrigger()
  }, 100);

  checkForMobile();
  window.addEventListener('resize', checkForMobile)

});

onUnmounted(() => {
  ScrollTrigger.killAll()
  timer.value = null
  window.removeEventListener('resize', checkForMobile)

})



</script>

<style lang="scss" scoped>
.home-page-wrapper main {
  padding-top: 67vh;
}
</style>