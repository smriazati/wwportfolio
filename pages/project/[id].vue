<template>
  <div>
    <Suspense>
      <div>
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
  latlng,
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
