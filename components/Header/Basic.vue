<template>
    <header>
        <div class="header-wrapper header-wrapper-basic header-fixed-bottom">
            <NavContainer v-if="isDesktop"></NavContainer>
            <NavContainerMobile v-else></NavContainerMobile>
        </div>
    </header>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const windowWidth = ref(0)
onMounted(() => {
    windowWidth.value = window.innerWidth
    window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth
    })
})
onUnmounted(() => {
    window.removeEventListener('resize', () => {
        windowWidth.value = window.innerWidth
    })
});

const isDesktop = computed(() => {
    return windowWidth.value >= 800
})

</script>