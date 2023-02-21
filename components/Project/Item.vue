<script setup>
const props = defineProps(['data'])
</script>

<template>
    <div class="content-wrapper grid">
        <header class="title-wrapper">
        <h1 v-if="data.title">{{ data.title }}</h1>
        <h2 v-if="data.location">{{ data.location }}</h2>
        </header>
        <!-- <section v-if="data.latlng?.lat && data.latlng?.lng" class="weather-wrapper">
                <ProjectWeather :data="data.latlng" />
            </section> -->
        <section class="description-wrapper">
            <div class="text-wrapper">
                <SanityContent :blocks="data.description?.rte" />
            </div>
        </section>
        <section class="featured-image-wrapper">
            <div v-if="data?.featured?.url" class="image-wrapper">
                <img :src="$urlFor(data.featured.url).url()" :alt="data.featured?.alt" />
            </div>
        </section>
        <section class="all-images-wrapper">
            <ul>
                <li v-for="item in data.grid" :key="item._key">
                    <div v-if="item?.img?.url" class="image-wrapper">
                        <img :src="$urlFor(item.img.url).url()" :alt="item.img?.alt" />
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<style lang="scss" scoped>
$collapse-bp: 800px;

.grid {
    margin-bottom: 80px;

    .title-wrapper,
    .weather-wrapper,
    .description-wrapper,
    .featured-image-wrapper {
        padding: 20px;
    }

    .title-wrapper {
        grid-column: 1 / span 4;
        grid-row: 1 / 2;

    }

    .weather-wrapper {
        grid-column: 5 / span 4;
        grid-row: 1/2;
        padding-left: 0;
    }

    .description-wrapper {
        grid-column: 1 / span 4;
        grid-row: 2 / 3;

        @media (max-width: $collapse-bp) {
            grid-column: 1 / span 7;
        }

        .text-wrapper {
            max-width: 453px;
        }
    }

    .featured-image-wrapper {
        grid-column: 5 / span 4;
        grid-row: 2 / 3;

        @media (max-width: $collapse-bp) {
            grid-column: 1 / span 8;
            grid-row: 3 / 4;
        }
    }

    .all-images-wrapper {
        grid-column: 1 / span 8;
        grid-row: 3 / 4;

        @media (max-width: $collapse-bp) {
            grid-column: 1 / span 8;
            grid-row: 4 / 5;
        }

        ul {
            display: flex;
            flex-wrap: wrap;
        }
    }
}
</style>