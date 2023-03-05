<template>
    <div>
        <ul v-if="data?.grid" ref="grid" class="home-grid-items-blur">
            <li v-for="item in data.grid" v-bind:key="item.slug?.current" :class="`type-${item._type} unblur`"
                :data-title="item.title" :data-location="item.location"
                :data-type="item.type === 'research' ? 'research' : (item.type === 'commission' ? 'commission' : 'commission')"
                @mouseover="setActiveProject(item.title, item.location)" @mouseout="clearActiveProject">
                <NuxtLink :to="`/${item._type === 'project' ? 'project' : 'client'}/${item.slug?.current}`">
                    <div v-if="item.featured" class="image-wrapper">
                        <img :src="$urlFor(item.featured?.url).format('webp').url()" :alt="item.img?.alt" loading="lazy" />
                    </div>
                </NuxtLink>
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
type
`

const query = `
*[_type == "homePage"]{
  "grid": grid[].item-> {
    ${projectQuery}
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
        blurredList.value = grid.value.querySelectorAll(`li:not([data-type="${type}"])`);
        if (!blurredList.value) { return }
        blurredList.value.forEach((item) => {
            item.classList.add('blur')
        })
    } else {
        blurredList.value.forEach((item) => {
            item.classList.remove('blur')
        })
        blurredList.value = null
    }
})

</script>

<style lang="scss" scoped>
@mixin smImg {
    img {
        width: 15vw;
    }
}

ul {
    position: relative;
    z-index: 2;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-auto-flow: dense;

    li {
        padding: 12px;
        margin-bottom: 10vh;

        &:first-child {
            grid-column: 1 / span 5;
            grid-row: 1 / 3;
        }

        &:nth-child(2) {
            grid-column: 7 / span 2;
            grid-row: 1 / 2;
            justify-self: end;
            @include smImg;
        }

        &:nth-child(3) {
            grid-column: 7 / span 2;
            grid-row: 2/3;
            place-self: end;
            @include smImg;
        }

        &:nth-child(4) {
            grid-column: 1 / span 2;
            grid-row: 3 / 4;
            align-self: end;
            @include smImg;
        }

        &:nth-child(5) {
            grid-column: 1 / span 2;
            grid-row: 4 / 5;
            align-self: end;
            @include smImg;
        }

        &:nth-child(6) {
            grid-column: 5 / span 4;
            grid-row: 3 / 5;
        }

        &:nth-child(7) {
            grid-column: 1 / span 4;
            grid-row: 5 / 7;
        }

        &:nth-child(8) {
            grid-column: 7 / span 2;
            grid-row: 5 / 6;
            justify-self: end;
            @include smImg;
        }

        &:nth-child(9) {
            grid-column: 7 / span 2;
            grid-row: 6 / 7;
            place-self: end;
            @include smImg;
        }

        &:nth-child(10) {
            grid-column: 1 / span 2;
            grid-row: 7 / 8;
            align-self: end;
            @include smImg;
        }

        &:nth-child(11) {
            grid-column: 1 / span 2;
            grid-row: 8 / 9;
            align-self: end;
            @include smImg;
        }

        &:nth-child(12) {
            grid-column: 5 / span 4;
            grid-row: 7 / 9;
        }

    }

}
</style>