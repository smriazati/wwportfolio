<template>
    <header ref="header" class="site-header">
        <div class="header-wrapper gsap-wrapper">
            <NavContainer></NavContainer>
        </div>
    </header>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';

const header = ref();
const tl = ref();
const ctx = ref();

onMounted(() => {

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
});

onUnmounted(() => {
    ctx.value.revert();
});

</script>
