<template>
    <li :class="`unblur`" v-bind="dataAttributes">
        <div v-if="item" class="image-wrapper" @mouseover="setActiveProject" @mouseout="clearActiveProject">
            <template v-if="item._type === 'single'">
                <GridFlexItemImg :src="gridImg.url" :alt="gridImg.alt" />
            </template>
            <template v-else>
                <NuxtLink v-if="item._type === 'project' || item._type === 'client'"
                    :to="`/${item._type === 'project' ? 'project' : 'client'}/${item.slug?.current}`">
                    <GridFlexItemImg :src="gridImg.url" :alt="gridImg.alt" />
                </NuxtLink>
            </template>
        </div>
    </li>
</template>

<script setup>
import { computed, defineEmits } from 'vue';
import GridFlexItemImg from '@/components/Home/GridFlexItemImg.vue';

const emit = defineEmits(['set-active', 'clear-active']);

const props = defineProps({
    item: Object
});

function setActiveProject() {
    emit('set-active', {
        title: props.item.title,
        location: props.item.location,
        _id: props.item._id
    });
}

function clearActiveProject() {
    emit('clear-active');
}

const gridItemType = computed(() => {
    switch (props.item._type) {
        case 'single':
            return 'single';
        case 'research':
            return 'research';
        case 'commmission':
            return 'commission';
        default:
            return 'commission';
    }
});

const dataAttributes = computed(() => ({
    'data-title': props.item._id,
    'data-location': props.item.location,
    'data-type': gridItemType.value,
    'data-item-width': props.item.width || '35',
}));


const gridImg = computed(() => {
    if (props.item._type === 'single') {
        return {
            url: props.item.url || '',
            alt: props.item?.altText || '',
        };
    }

    if (props.item.customTnail) {
        return {
            url: props.item.customTnail.url,
            alt: props.item.customTnail.altText,
        };
    }

    if (props.item.featured?.url) {
        return {
            url: props.item.featured.url,
            alt: props.item.featured?.alt || '',
        };
    }

    if (props.item.firstProject?.img?.url) {
        return {
            url: props.item.firstProject.img.url,
            alt: props.item.firstProject.img.altText || '',
        };
    }

    return { url: '', alt: '' };
});

</script>
<style lang="scss" scoped>
li {
    padding: 0;
    margin-bottom: 10vh;

    &[data-item-width="25"] {

        width: 25vw;
    }

    &[data-item-width="35"] {
        width: 35vw;

    }

    &[data-item-width="60"] {
        width: 60vw;
    }

    // possible conditional styles to make more interesting layouts
    // &[data-item-width="60"]+&[data-item-width="60"] {
    //     padding-left: 15vw;
    // }

    .image-wrapper {
        padding: 12px;

        &::before {
            content: '';

            @media (min-width: $collapse-bp) {
                margin-bottom: 450px;
            }
        }

    }

}
</style>