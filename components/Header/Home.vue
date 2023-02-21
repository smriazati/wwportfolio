<template>
    <header ref="header" class="site-header">
        <div class="header-wrapper gsap-wrapper">
            <NavContainer v-if="isDesktop"></NavContainer>
            <NavContainerMobile v-else></NavContainerMobile>
        </div>
    </header>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';

const header = ref();
const tl = ref();
const ctx = ref();

const windowWidth = ref(0)
const isDesktop = computed(() => {
    return windowWidth.value >= 800
})

onMounted(() => {

    ctx.value = gsap.context((self) => {
        const els = self.selector('.gsap-wrapper');
        if (!els) { return }
        const headerWrapper = els[0];

        // let headerHeight = 0
        // if (isDesktop.value) {
        //     headerHeight = headerWrapper.offsetHeight
        // } else {
        //     const listItems = self.selector('.dropdown-nav li');
        //     const itemHeight = 19;
        //     const listTitleCount = 2;
        //     const listHeight = listItems.length * itemHeight + (listTitleCount * itemHeight);
        //     headerHeight = listHeight
        // }
        tl.value = gsap
            .timeline()
            .to(headerWrapper, {
                y: window.innerHeight - headerWrapper.offsetHeight,
                scrollTrigger: {
                    trigger: headerWrapper,
                    start: "top top",
                    end: `+=${window.innerHeight / 2}`,
                    scrub: 1.1,
                    // onToggle: self => console.log("toggled, isActive:", self.isActive),
                    onEnter() {
                        // console.log('on enter')
                        headerWrapper.classList.remove('header-fixed-bottom');
                    },
                    onLeave() {
                        // console.log('on leave')
                        headerWrapper.classList.add('header-fixed-bottom');
                    },
                    onEnterBack() {
                        // console.log('on enter back')
                        headerWrapper.classList.add('header-fixed-bottom');
                    },
                    onLeaveBack() {
                        // console.log('on leave back')
                        headerWrapper.classList.remove('header-fixed-bottom');
                    }
                }
            })
    }, header.value);

    windowWidth.value = window.innerWidth
    window.addEventListener('resize', () => {
        windowWidth.value = window.innerWidth
    })
});

onUnmounted(() => {
    ctx.value.revert();
    window.removeEventListener('resize', () => {
        windowWidth.value = window.innerWidth
    })
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