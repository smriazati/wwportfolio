<template>
    <div class="content-wrapper grid">
        <header class="title-wrapper">
            <h1 v-if="data.title">{{ data.title }}</h1>
            <h2 v-if="data.location">{{ data.location }}</h2>
        </header>
        <section v-if="data.latlng?.lat && data.latlng?.lng" class="weather-wrapper">
            <ProjectWeather :data="data.latlng" />
        </section>
        <section class="text-wrapper">
            <div class="description-wrapper">
                <SanityContent :blocks="data.description?.rte" :serializers="serializers" />
            </div>
            <div class="date-wrapper">
                <ul v-if="data.dateRange">
                    <li v-for="(item, index) in data.dateRange" :key="index">{{ item }}</li>
                </ul>
            </div>
            <div class="press-wrapper" v-if="data.press?.rte">
                <h3>Press</h3>
                <SanityContent :blocks="data.press?.rte" :serializers="serializers" />
            </div>
            <div v-if="data.links" class="links-wrapper">
                <div v-for="item in data.links" :key="item._key">
                    <a class='btn-fill' :href="item.url" target="_blank">{{ item.text }}</a>
                </div>
            </div>
        </section>

        <section class="featured-image-wrapper">
            <div v-if="data?.featured?.url" class="image-wrapper">
                <img :src="$urlFor(data.featured.url).width(1000).format('webp').url()" :alt="data.featured?.alt" />
            </div>
        </section>
        <section class="all-images-wrapper">
            <ul class="grid">
                <li v-for="(item, index) in data.grid" :key="item._key" :class="`${item.size} ${galleryClasses[index]}`">
                    <div v-if="item?.img?.url" class="image-wrapper">
                        <img :src="$urlFor(item.img.url).width(1800).format('webp').url()" :alt="item.img?.alt" />
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>
<script setup>
import SerializerLink from '../../components/Serializer/Link.vue'

const props = defineProps(['data'])
const serializers = {
    marks: {
        // internalLink: NuxtLink,
        externalLink: SerializerLink,
    }
}


const galleryClasses = ref([]);
const addClassesToItems = () => {
    const list = ref(props.data.grid);
    if (!list.value) { return }
    list.value.forEach((item, index) => {
        if (!item.size) {
            const prevListItem = galleryClasses.value[index - 1];
            if (prevListItem == 'reg-left') {
                galleryClasses.value[index] = 'reg-right'
            } else {
                galleryClasses.value[index] = 'reg-left'
            }
        }
    })
}
addClassesToItems();

</script>

<style lang="scss" scoped>
$collapse-bp: 800px;

.grid {
    margin-bottom: 80px;

    .title-wrapper,
    .weather-wrapper,
    .text-wrapper,
    .featured-image-wrapper {
        padding: 20px;
    }

    .featured-image-wrapper {
        @media (min-width: $collapse-bp) {
            padding-left: 0px;
        }
    }

    .title-wrapper {
        grid-column: 1 / span 4;
        grid-row: 1 / 2;

        h2 {
            font-family: 'Karl Mono', Arial, Helvetica, sans-serif;
        }
    }

    .date-wrapper {
        margin-bottom: 25px;

        p,
        li {
            font-family: 'Karl Mono', Arial, Helvetica, sans-serif;
        }
    }

    .weather-wrapper {
        grid-column: 5 / span 4;
        grid-row: 1/2;
        padding-left: 0;
        font-family: 'Karl Mono', Arial, Helvetica, sans-serif;
    }

    .text-wrapper {
        grid-column: 1 / span 4;
        grid-row: 2 / 3;

        @media (min-width: $collapse-bp) {
            margin-top: -5px;
        }

        @media (max-width: $collapse-bp) {
            grid-column: 1 / span 8;
        }


    }


    .description-wrapper {
        max-width: 453px;
    }

    .links-wrapper {
        margin-top: 25px;
    }

    .featured-image-wrapper {
        grid-column: 5 / span 4;
        grid-row: 2 / 3;

        @media (max-width: $collapse-bp) {
            grid-column: 1 / span 8;
            grid-row: 3 / 4;
        }

        @media (max-height: 500px) {
            img {
                max-height: 500px;
            }
        }

        @media (min-height: 500px) {
            text-align: right;

            img {
                max-height: 100vh;
            }
        }

    }

    .all-images-wrapper {
        grid-column: 1 / span 8;
        grid-row: 3 / 4;

        @media (max-width: $collapse-bp) {
            grid-column: 1 / span 8;
            grid-row: 4 / 5;
        }

    }
}

.all-images-wrapper ul {
    list-style: none;

    li {
        margin-top: 335px;
    }

    li:not(.full) img {
        max-height: 100vh;
    }

    .reg-left {
        padding-left: 20px;
        grid-column: 1 / span 4;
    }

    .reg-right {
        text-align: right;
        padding-right: 20px;
        grid-column: 4 / span 5;
    }

    .large {
        grid-column: span 8;
        padding-left: 20px;
        padding-right: 20px;
    }

    .full {
        grid-column: span 8;
    }
}

.press-wrapper h3 {
    font-family: 'Karl Mono', Arial, Helvetica, sans-serif;
}
</style>