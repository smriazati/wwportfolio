<template>
    <header ref="header" class="site-header">
        <div class="header-wrapper gsap-wrapper">
            <NavContainer v-if="isMobile === false"></NavContainer>
            <NavContainerMobile v-else></NavContainerMobile>
        </div>
    </header>
</template>
<script setup>
import gsap from 'gsap';

const header = ref();
const tl = ref();
const ctx = ref();

const isMobile = ref(false);
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

    ctx.value = gsap.context((self) => {
        const els = self.selector('.gsap-wrapper');
        if (!els) { return }
        const headerWrapper = els[0];
        tl.value = gsap
            .timeline()
            .to(headerWrapper, {
                y: window.innerHeight - headerWrapper.offsetHeight,
                scrollTrigger: {
                    trigger: headerWrapper,
                    start: "top top",
                    end: `+=${window.innerHeight / 2}`,
                    scrub: 1.1,
                    // markers: true,
                    onEnter() {
                        headerWrapper.classList.remove('header-fixed-bottom');
                    },
                    onLeave() {
                        headerWrapper.classList.add('header-fixed-bottom');
                    },
                    onEnterBack() {
                        headerWrapper.classList.add('header-fixed-bottom');
                    },
                    onLeaveBack() {
                        headerWrapper.classList.remove('header-fixed-bottom');
                    }
                }
            })
    }, header.value);


});

onUnmounted(() => {
    window.removeEventListener('resize', checkForMobile)
    ctx.value.revert();
});



</script>
<style>
.header-wrapper.gsap-wrapper:not(.header-fixed-bottom) .grid>*:first-child {
    align-self: start
}

.header-wrapper.gsap-wrapper:not(.header-fixed-bottom) ul.main-nav {
    align-items: flex-start
}

.header-wrapper.header-fixed-bottom .inner-dropdown-container {
    bottom: 34px;
}
</style>