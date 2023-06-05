<template>
  <div>
    <Suspense>
      <div class="client-page">
        <header class="client-title-wrapper">
          <h2>Selected Work</h2>
          <h1 v-if="data.title">{{ data.title }}</h1>
        </header>
        <div>
          <div v-for="(item, index) in data.projects" :key="index" class="project-panel">
            <ProjectItem :data="item" />
          </div>
        </div>
      </div>
    </Suspense>
  </div>
</template>
<script setup>
const route = useRoute()
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
"featured": {
    "url": featured.asset->url,
    "alt": featured.asset->altText
  },
  "grid": grid[]{
    size,
    "img": {
    "url": img.asset->url,
    "alt": img.asset->altText    }
  },
  slug,
  latlng,
  title,
  dateRange,
  press,
  links,
  location, 
  description,
  type
`
const query = groq`
*[_type == "client" && slug.current == $slug && hasPage][0]{
  title,
  slug,
  "featured": {
    "url": featured.asset->url,
    "alt": featured.asset->altText
  },
  ${seoQuery},
  "projects": projects[]->{
    ${projectQuery}
  }
}
`;

const { data } = await useSanityQuery(query, { slug: route.params.id })

watchEffect(() => {
  if (data.value?.title === undefined) {
    throw ({ statusCode: 404, message: 'Page not found' })
  }
})

const ogImg = computed(() => {
  if (data?.value?.seo?.img?.url) {
    return data.value.seo.img.url
  }
  if (data?.value?.featured?.url) {
    return data.value.featured.url
  }
  return ''
})
const desc = computed(() => {
  if (data?.value?.seo?.shortDesc) {
    return data.value.seo.shortDesc
  }
  return ''
})
useHead({
  title: data?.value?.title,
  meta: [
    { name: 'description', content: desc },
    { property: 'og:image', content: ogImg }
  ],
})
</script>

<style lang="scss" scoped>
.client-title-wrapper {
  padding: 20px;

  h2 {
    font-family: 'Karl Mono', Arial, Helvetica, sans-serif;
  }
}

.project-panel+.project-panel {
  margin-top: 338px;
}

h2 {
  margin-bottom: 0px;
}
</style>