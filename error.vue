<template>
    <div class="error-wrapper">
        <HeaderBasic />
        <div class="text-wrapper">
            <h1>Error</h1>
            <p>{{ error.message }}</p>
            <nuxt-link to="/">Try going home instead?</nuxt-link>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    error: Object
})
const handleError = () => clearError({ redirect: '/' })
</script>
<style>
.error-wrapper {
    min-height: 100vh;
    padding: 20px;
}
</style>
