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
ul {
    position: relative;
    z-index: 2;
    list-style: none;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-auto-flow: dense;

    li {
        padding: 12px;
        margin-bottom: 10vh;

        // &.type-project {
        //     flex: 0 0 50%;
        // }

        // &.type-client,
        // &.type-commission {
        //     flex: 0 0 25%;
        // }

        &[data-type="research"] {
            grid-column: span 5;
            grid-row: span 2;
            width: 50vw;
        }

        &[data-type="commission"] {
            grid-column: span 2;
            width: 15vw;
            place-self: end;
        }
    }

}
</style>