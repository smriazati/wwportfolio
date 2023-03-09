<template>
    <div class="nav-container grid">
        <h1 class="unblur" ref="brand">
            <NuxtLink to="/">Will Warasila</NuxtLink>
        </h1>
        <nav ref="nav">
            <ul class="main-nav">
                <li class="unblur has-dropdown" data-dropdown="nav1">
                    <NavDropdown navType="nav1"></NavDropdown>
                </li>
                <li class="unblur has-dropdown" data-dropdown="nav2">
                    <NavDropdown navType="nav2"></NavDropdown>
                </li>
                <li class="unblur">
                    <NuxtLink to="/about">About</NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
const brand = ref(null)
const nav = ref(null)

const getSiblings = function (elem) {
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
    if (!el) { return }
    el.classList?.add('blur');
}
const removeBlur = (el) => {
    if (!el) { return }
    el.classList?.remove('blur');
}


function initHoverFx() {
    if (brand.value) {
        brand.value.addEventListener('mouseover', () => {
            addBlur(nav.value)
        })
        brand.value.addEventListener('mouseout', () => {
            removeBlur(nav.value)
        })
    }

    const navItems = nav.value?.querySelectorAll('li');
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
    initHoverFx()
})

</script>
<style lang="scss" scoped>
.nav-container {
    @media (max-width: $collapse-bp) {
        display: none;
    }
}

.grid {
    width: 100%;
}

h1 {
    grid-column: 1 / 3;
}

nav {
    grid-column: 3 / 9;
}

nav {
    display: flex;
}

ul.main-nav {
    list-style: none;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 25px;
    align-items: center;

    &>li:first-child {
        grid-column: 1 / span 2;
        grid-row: 1 / 2;
    }

    &>li:nth-child(2) {
        grid-column: 3 / span 2;
        grid-row: 1 / 2;
    }

    &>li:nth-child(3) {
        grid-column: 5 / span 2;
        grid-row: 1 / 2;
    }
}
</style>