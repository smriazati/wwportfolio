<template>
  <section>

    <Head>
      <Title>About</Title>
      <Meta name="description" :content="data?.seo?.shortDesc" />
      <Meta name="og:img" :content="data?.seo?.img?.url" />
    </Head>
    <div v-if="data" class="grid">
      <div class="column">
        <div class="text-wrapper">
          <SanityContent :blocks="data.column1.rte" :serializers="serializers" />
        </div>
      </div>
      <div class="column">
        <div class="text-wrapper">
          <SanityContent :blocks="data.column2.rte" :serializers="serializers" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import SerializerLink from '../components/Serializer/Link.vue'

const serializers = {
  marks: {
    // internalLink: NuxtLink,
    externalLink: SerializerLink,
  }
}

const seoQuery = `
"seo": {
  "shortDesc": seo.description_short,
    "img": {
      "url": seo.featured.asset->url,
      "alt": seo.featured.asset->altText
    }
}
`
const pageQuery = `
column1, column2,
"shortDesc": description_short
`
const query = groq`
*[_type=="aboutPage"]{
  ${seoQuery}, ${pageQuery}
}[0]
`;
const { data } = useSanityQuery(query);

</script>
<style lang="scss" scoped>
section {
  padding: 20px;
  padding-bottom: 100px;
}

.grid {
  .column:first-child {
    grid-column: 1 / span 3;
  }

  .column:last-child {
    grid-column: 5 / span 3;
  }

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
  }
}
</style>