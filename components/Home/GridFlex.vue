<template>
    <div>
        <ul v-if="data?.grid" ref="grid" class="home-grid-items-blur">
            <li v-for="item in data.grid" v-bind:key="item.item?.slug?.current" :class="`unblur`"
                :data-title="item.item?.title" :data-location="item.item?.location"
                :data-type="item._type === 'single' ? 'single' : item.item?.type === 'research' ? 'research' : (item.item?.type === 'commission' ? 'commission' : 'commission')">
                <div v-if="item" class="image-wrapper">
                    <template v-if="item._type === 'single'">
                        <img :src="$urlFor(item?.url).width(1500).format('webp').url()" :alt="item?.altText" />
                    </template>
                    <template v-else>
                        <NuxtLink v-if="item.item._type === 'project' || item.item._type === 'client'"
                            :to="`/${item.item._type === 'project' ? 'project' : 'client'}/${item.item.slug?.current}`">
                            <div @mouseover="setActiveProject(item.item.title, item.item.location)"
                                @mouseout="clearActiveProject">
                                <img v-if="item.customTnail"
                                    :src="$urlFor(item.customTnail.url).width(1500).format('webp').url()"
                                    :alt="item.customTnail.altText" />
                                <img v-else-if="item.item.featured && item.item.featured.url"
                                    :src="$urlFor(item.item.featured.url).width(1500).format('webp').url()"
                                    :alt="item.customTnail?.alt" />
                                <img v-else-if="item.item.firstProject && item.item.firstProject.img && item.item.firstProject.img.url"
                                    :src="$urlFor(item.item.firstProject.img.url).width(1500).format('webp').url()"
                                    :alt="item.item.firstProject.img.altText" />
                            </div>
                        </NuxtLink>
                    </template>
                </div>


            </li>
        </ul>
    </div>
</template>

<script setup>
import { useActiveProjectStore } from '@/stores/activeProject'


const projectQuery = `
_type,
"featured": {
  "url": featured.asset->url,
  "alt": featured.asset->altText
},
slug,
location,
title,
type,
"firstProject": projects[0]->{
     "img": featured.asset->{url, altText}
}
`

const query = `
*[_type == "homePage"]{
    "grid": grid[]{
        _type == "single" => {
            _type,
            "url": img.asset->url,
            "alt": img.asset->altText
        },
        _type == "projectGridItem" => {
            item->{
           ${projectQuery}
        },
        "customTnail": tnail_custom.asset->{url, altText}
        }
    }
}[0]
`
const { data } = await useSanityQuery(query);

const activeProjectStore = useActiveProjectStore()

function setActiveProject(title, location) {
    activeProjectStore.setActiveProject(title, location)
}

function clearActiveProject() {
    activeProjectStore.clearActiveProject()
}

const grid = ref()
const blurredList = ref(null)

watch(activeProjectStore.activeProject, () => {
    const title = activeProjectStore.activeProject?.title;
    if (title) {
        if (!grid.value) { return }
        blurredList.value = grid.value.querySelectorAll(`li:not([data-title="${title}"])`);
        if (!blurredList.value) { return }
        blurredList.value.forEach((item) => {
            item.classList.add('blur')
        })
    } else {
        if (!blurredList.value) { return }
        blurredList.value.forEach((item) => {
            item.classList.remove('blur')
        })
        blurredList.value = null
    }
})

watch(() => activeProjectStore.activeProjectType, () => {
    const type = activeProjectStore.activeProjectType;
    if (type) {
        if (!grid.value) { return }
        blurredList.value = grid.value.querySelectorAll(`li:not([data-type="${type}"])`);
        if (!blurredList.value) { return }
        blurredList.value.forEach((item) => {
            item.classList.add('blur')
        })
    } else {
        if (!blurredList.value) { return }
        blurredList.value.forEach((item) => {
            item.classList.remove('blur')
        })
        blurredList.value = null
    }
})

</script>

<style lang="scss" scoped>
ul {
    position: relative;
    z-index: 2;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;


    li {
        padding: 12px;
        margin-bottom: 10vh;

        @media (min-width: $collapse-bp) {
            margin-bottom: 450px;
        }

        &[data-type="single"] {
            width: 35vw;

            @media (max-width: $collapse-bp) {
                width: 100vw;
            }

            img {
                max-height: 100vh;
                width: auto;
            }
        }

        &[data-type="research"] {
            width: 60vw;

            @media (max-width: $collapse-bp) {
                width: 100vw;
            }

            img {
                max-height: 100vh;
                width: auto;

            }
        }

        &[data-type="commission"] {
            .image-wrapper {
                width: 25vw;
                padding-left: 25%;

                @media (max-width: $collapse-bp) {
                    width: 35vw;
                    padding-left: 10%;
                }
            }

            .image-wrapper::before {
                content: '';
                background: green;
            }
        }

    }

}
</style>