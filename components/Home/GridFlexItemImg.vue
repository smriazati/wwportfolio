<template>
    <img :src="$urlFor(src).width(1500).format('webp').url()" :alt="alt" />
</template>

<script setup>
defineProps({
    src: String,
    alt: String,
});
</script>
