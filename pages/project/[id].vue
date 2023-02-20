<template>
  <div>
    <Suspense>
      <div>

        <Head>
          <Title>{{ data?.title }}</Title>
          <Meta v-if="data?.seo?.shortDesc" name="description" :content="data?.seo?.shortDesc" />
          <Meta v-if="data?.seo?.img?.url" name="og:img" :content="data?.seo?.img?.url" />
          <Meta v-else name="og:img" :content="data?.featured?.url" />
        </Head>
        <div v-if="data">
          <ProjectItem :data="data" />
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
  title,
  location, 
  description,
  type,
  ${seoQuery}
`
const query = groq`
*[_type=="project" && slug.current == $slug][0]{
${projectQuery}
}
`;
const { data } = await useSanityQuery(query, { slug: route.params.id })

</script>
