<script setup>
const query = groq`
*[_type=="commissions_page"]{
"text": rte,
gallery[]{
  image_count,
  commission->{
    _id,
    gallery[]{
      "img": {
        "url": asset->url,
        "alt": asset->altText
      }
    }
  }
}
}[0]
`;
const { data } = useSanityQuery(query);
useHead({
  title: 'Commissions',
  bodyAttrs: {
    class: 'commissions-page'
  }
})
</script>
<template>
  <div>
    <div v-if="data">
      <SanityContent :blocks="data.text" />
      <div v-for="item in data.gallery" :key="item.commission._id">
        <div v-for="(img, index) in item.commission.gallery.slice(0,item.image_count)" :key="index">
          <img
              :src="$urlFor(img.img.url).size(426).url()"
              :alt="img.img.alt"
              height="426"
              width="426"
              loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>