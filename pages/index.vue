<script setup>
const query = groq`
*[_type=="project_page"]{
  gallery[]->{
    title,
    slug,
    "img": {
      "url": grid.asset->url,
      "alt": grid.asset->altText
    }
  }
}[0]
`;
const { data } = useSanityQuery(query);

useHead({
  title: 'Projects',
  bodyAttrs: {
    class: 'index-page'
  }
})

</script>
<template>
  <div>
    <div v-if="data">

    <ul>
        <li v-for="item in data.gallery">
          <NuxtLink :to="`projects/${item.slug?.current}`">
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
          </NuxtLink>
        </li>
    </ul>
    </div>
  </div>
</template>