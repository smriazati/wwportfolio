
<script setup>
const route = useRoute()
const query = groq`
*[_type=="project" && slug.current == $slug][0]{
  title,
  description_short,
  description,
  _id,
  slug,
  "gridImg": {
      "url": grid.asset->url,
      "alt": grid.asset->altText
  },
  gallery[]{
    "img": {
      "url": asset->url,
      "alt": asset->altText
    }
  }
}
`;
const { data } = useSanityQuery(query, { slug: route.params.id })

</script>

<template>
    <div>
      <Head>
        <Title>{{ data.title }}</Title>
        <Meta name="description" :content="data?.description_short" />
        <Meta name="og:image" :content="data?.gridImg?.url" />
        <Meta name="og:image:alt" :content="data?.gridImg?.alt" />
      </Head>
      <div v-if="data">
     
        <SanityContent :blocks="data.description" />
        <ul>
            <li v-for="item in data.gallery">
            <div class="image-wrapper">
                <img
                    :src="$urlFor(item.img.url).size(426).url()"
                    :alt="item.img.alt"
                    height="426"
                    width="426"
                    loading="lazy"
                />
            </div>
        </li>
        </ul>
      </div>
  </div>
</template>