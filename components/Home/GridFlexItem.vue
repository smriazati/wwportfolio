<template>
    <li :class="`unblur`" :data-title="item._id" :data-location="item.location" :data-type="gridItemType">
        <div v-if="item" class="image-wrapper" :style="`width: ${gridItemSize}`" @mouseover="setActiveProject"
            @mouseout="clearActiveProject">
            <template v-if="item._type === 'single'">
                <img :src="$urlFor(gridImg.url).width(1500).format('webp').url()" :alt="gridImg.alt" />
            </template>
            <template v-else>
                <NuxtLink v-if="item._type === 'project' || item._type === 'client'"
                    :to="`/${item._type === 'project' ? 'project' : 'client'}/${item.slug?.current}`">
                    <img :src="$urlFor(gridImg.url).width(1500).format('webp').url()" :alt="gridImg.alt" />
                </NuxtLink>
            </template>
        </div>
    </li>
</template>

<script setup>
import { useActiveProjectStore } from '@/stores/activeProject';
import { computed } from 'vue';



const props = defineProps({
    item: Object
});

const activeProjectStore = useActiveProjectStore();

function setActiveProject() {
    activeProjectStore.setActiveProject(props.item.title, props.item.location, props.item._id);
}

function clearActiveProject() {
    activeProjectStore.clearActiveProject();
}


const gridItemType = computed(() => {
    if (props.item._type === 'single') return 'single';
    return props.item.type === 'research' ? 'research' : 'commission';
});


const width = computed(() => {
    if (props.item.width !== null && props.item._type !== 'single') {
        return `${props.item.width}vw`;
    }
    return '35vw';
});


const gridItemSize = computed(() => {
    if (gridItemType.value === 'single') {
        // get custom size,  35vw as fallback
        const size = props.item.size
        return size !== undefined ? `${size}vw` : '35vw';
    }

    if (props.item.width !== undefined) {
        return `${props.item.width}vw`;
    }
    return '35vw';
});
const gridImg = computed(() => {
    let url = '';
    let alt = '';

    if (props.item._type === 'single') {
        url = props.item.url;
        alt = props.item?.altText;
    } else {
        if (props.item.customTnail) {
            url = props.item.customTnail.url;
            alt = props.item.customTnail.altText;
        } else if (props.item.featured && props.item.featured.url) {
            url = props.item.featured.url;
            alt = props.item.customTnail?.alt;
        } else if (props.item.firstProject && props.item.firstProject.img && props.item.firstProject.img.url) {
            url = props.item.firstProject.img.url;
            alt = props.item.firstProject.img.altText;
        }
    }

    return { url, alt };
});
</script>
<style lang="scss" scoped>
li {
    padding: 0;

    .image-wrapper {
        padding: 12px;

    }

    margin-bottom: 10vh;

    @media (min-width: $collapse-bp) {
        margin-bottom: 450px;
    }

    &[data-type="single"],
    &[data-type="research"] {

        img {
            max-height: 100vh;
            width: auto;
        }
    }

    &[data-type="research"] {
        .image-wrapper {
            @media (max-width: $collapse-bp) {
                width: 100% !important;
            }
        }

    }



    &[data-type="commission"] {
        .image-wrapper {
            padding-left: 25%;

            @media (max-width: $collapse-bp) {
                width: 35vw !important;
                padding-left: 10%;
            }
        }

        .image-wrapper::before {
            content: '';
            background: green;
        }
    }

}
</style>