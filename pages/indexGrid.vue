<template>
    <div class="home-page-wrapper">
        <Suspense>
            <div>

                <Head>
                    <Title>Home</Title>
                    <Meta name="description" :content="data?.seo?.shortDesc" />
                    <Meta name="og:img" :content="data?.seo?.img?.url" />
                </Head>
                <main>
                    <HomeGridGrid></HomeGridGrid>
                    <HomeBehindTheScenes></HomeBehindTheScenes>
                </main>
            </div>
        </Suspense>
        <!-- <HomeActiveProjectOverlay>
    </HomeActiveProjectOverlay> -->

    </div>
</template>

<script setup>

const seoQuery = `
"seo": {
  "shortDesc": seo.description_short,
    "img": {
      "url": seo.featured.asset->url,
      "alt": seo.featured.asset->altText
    }
}
`

const query = `
*[_type == "homePage"]{
  ${seoQuery}
}[0]
`
const { data } = await useSanityQuery(query);
definePageMeta({
    layout: "home"
});

</script>

<style lang="scss" scoped>
.home-page-wrapper {
    padding-top: 80px;
}
</style>