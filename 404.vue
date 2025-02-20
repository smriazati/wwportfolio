<template>
    <div class="error-wrapper">
        <HeaderBasic />
        <div class="text-wrapper">
            <h1>Page not found</h1>
            <nuxt-link to="/">Try going home instead?</nuxt-link>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    error: Object
})
console.log('error', error)
</script>
<style>
.error-wrapper {
    min-height: 100vh;
    padding: 20px;
}
</style>
