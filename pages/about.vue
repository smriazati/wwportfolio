<script setup>
const query = groq`
*[_type=="info_page"]{
  contact_info,
  cv,
  "img": {
    "url": img.asset->url,
    "alt": img.asset->altText
  }
}[0]
`;
const { data } = useSanityQuery(query);
useHead({
  title: 'About',
  bodyAttrs: {
    class: 'info-page'
  }
})
</script>
<template>
  <div>
    <div v-if="data">

    <!-- {{ data }} -->
    <ul>
        <li v-for="item in data.gallery">
            <div class="text-wrapper">
                {{ item.title }}
            </div>
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