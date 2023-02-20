<script setup>
import { onMounted, ref } from 'vue';

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
    el.classList.add('blur');
}
const removeBlur = (el) => {
    el.classList.remove('blur');
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
});


</script>

<template>
    <header>
        <div class="header-wrapper nav-on-bottom grid">
            <h1 class="unblur" ref="brand">
                <NuxtLink to="/">Will Warasila</NuxtLink>
            </h1>
            <nav ref="nav">
                <NavList />
            </nav>
        </div>
    </header>
</template>
<style lang="scss" scoped> .header-wrapper.nav-on-bottom {
     top: unset;
     bottom: 0;
 }
</style>