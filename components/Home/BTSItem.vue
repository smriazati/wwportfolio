<template>
    <li :key="data.id">
        <NuxtLink :to="`/project/${data.slug?.current}`">
            <figure v-if="data.img">
                <div v-if="data.img.url" class="image-wrapper">
                    <img :src="$urlFor(data.img.url).url()" :alt="data.img.alt" />
                </div>
                <div v-if="data.img.alt" class="text-wrapper">
                    <p>{{ data.img.alt }}</p>
                </div>
            </figure>
        </NuxtLink>
    </li>
</template>
<script setup>
const props = defineProps(['data'])
</script>
<style lang="scss" scoped>
img {
    max-height: 85vh;

    @media (min-width: $collapse-bp) {
        max-width: 75vw;
    }
}
</style>