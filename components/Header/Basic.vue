<template>
    <header class="site-header">
        <div class="header-wrapper header-wrapper-basic header-fixed-bottom">
            <NavContainer v-if="!isMobile"></NavContainer>
            <NavContainerMobile v-else></NavContainerMobile>
        </div>
    </header>
</template>
<script setup>

const isMobile = ref();
const checkForMobile = () => {
    if (window.innerWidth > 800) {
        isMobile.value = false
    } else {
        isMobile.value = true
    }
}
onMounted(() => {
    checkForMobile();
    window.addEventListener('resize', checkForMobile)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkForMobile)
});


</script>

