<script setup>
const query = groq`
*[_type=="siteMetadata"]{
  siteTitle,
  siteDesc,
  "ogImg": {
     "url": ogImg.asset->url,
     "alt": ogImg.asset->altText
  }
}[0]
`;
const { data } = useSanityQuery(query)
useHead({    
  titleTemplate: `%s - Will Warasila`,    
})

</script>
<template>
  <div>
    <NuxtLayout>
      <Head>
        <Meta name="description" :content="data?.siteDesc" />
        <Meta name="og:image" :content="data?.ogImg?.url" />
        <Meta name="og:image:alt" :content="data?.ogImg?.alt" />
      </Head>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>