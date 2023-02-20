<template>
  <div>
    <Suspense>
      <div>

        <Head>
          <Title>{{ data?.title }} - Client Work</Title>
          <Meta v-if="data?.seo?.shortDesc" name="description" :content="data?.seo?.shortDesc" />
          <Meta v-if="data?.seo?.img?.url" name="og:img" :content="data?.seo?.img?.url" />
          <Meta v-else name="og:img" :content="data?.featured?.url" />
        </Head>
        <header class="client-title-wrapper">
          <h1 v-if="data.title">Selected work <br />for {{ data.title }}</h1>
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
const router = useRouter()
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
  title,
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

</script>

<style lang="scss" scoped>
.client-title-wrapper {
  padding: 20px;
}

.project-panel+.project-panel {
  margin-top: 338px;
}
</style>