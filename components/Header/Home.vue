<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';

const header = ref();
const tl = ref();
const ctx = ref();

const brand = ref();
const nav = ref();

var getSiblings = function (elem) {
    var siblings = [];
    var sibling = elem.parentNode.firstChild;
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling
    }
    return siblings;
};

const addBlur = (el) => {
    el?.classList.add('blur');
}
const removeBlur = (el) => {
    el?.classList.remove('blur');
}

function initHoverFx() {
    const navItems = nav.value.querySelectorAll('li');
    if (brand.value) {
        brand.value.addEventListener('mouseover', () => {
            navItems.forEach(item => {
                addBlur(item)
            })
        })
        brand.value.addEventListener('mouseout', () => {
            navItems.forEach(item => {
                removeBlur(item)
            })
        })
    }
    if (navItems) {
        navItems.forEach(item => {
            const siblings = getSiblings(item)
            item.addEventListener('mouseover', () => {
                siblings.forEach(sibling => {
                    addBlur(sibling)
                })
                addBlur(brand.value)
            })
            item.addEventListener('mouseout', () => {
                siblings.forEach(sibling => {
                    removeBlur(sibling)
                })
                removeBlur(brand.value);
            })
        })
    }

}
onMounted(() => {

    initHoverFx();

    ctx.value = gsap.context((self) => {
        const els = self.selector('.header-wrapper');
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
                        headerWrapper.classList.remove('nav-on-bottom');
                    },
                    onLeave() {
                        // console.log('on leave')
                        headerWrapper.classList.add('nav-on-bottom');
                    },
                    onEnterBack() {
                        // console.log('on enter back')
                        headerWrapper.classList.add('nav-on-bottom');
                    },
                    onLeaveBack() {
                        // console.log('on leave back')
                        headerWrapper.classList.remove('nav-on-bottom');
                    }
                }
            })
    }, header.value);
});

onUnmounted(() => {
    ctx.value.revert();
});

</script>

<template>
    <header ref="header" class="site-header">
        <div class="header-wrapper grid">
            <h1 class="unblur" ref="brand">
                <NuxtLink to="/">Will Warasila</NuxtLink>
            </h1>
            <nav ref="nav">
                <NavList></NavList>
            </nav>
        </div>
    </header>
</template>
