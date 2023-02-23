<template>
    <div>
        <Suspense>
            <div class="dropdown collapsed" ref="dropdown">
                <div v-if="props.navType === 'nav1'" class="dropdown-inner">
                    <button @click="(e) => toggleDropdown(e)">Research</button>
                    <ul v-if="data" class="dropdown-nav">
                        <li v-for="item in data?.nav1" :key="item?.slug?.current" class="unblur"
                            @click="collapseOtherDropdowns">
                            <NuxtLink :to="`/${item?._type}/${item?.slug?.current}`">{{ item.title }}</NuxtLink>
                        </li>
                    </ul>
                </div>
                <div v-if="props.navType === 'nav2'" class="dropdown-inner">
                    <button @click="(e) => toggleDropdown(e)">Commissions</button>
                    <ul v-if="data" class="dropdown-nav">
                        <li v-for="item in data?.nav2" :key="item?.slug?.current" class="unblur"
                            @click="collapseOtherDropdowns">
                            <NuxtLink :to="`/${item?._type}/${item?.slug?.current}`">{{ item.title }}</NuxtLink>
                        </li>
                    </ul>
                </div>

            </div>
        </Suspense>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps(['navType'])
const dropdown = ref(null)

function collapseOtherDropdowns() {
    const container = dropdown.value.closest('.main-nav')
    if (!container) return
    const expandedDropdowns = container.querySelectorAll('.dropdown:not(.collapsed)');
    if (expandedDropdowns.length > 0) {
        expandedDropdowns.forEach(item => {
            item.classList.add('collapsed')
        })
    }
}

function toggleDropdown(e) {
    const parent = e.target.closest('.dropdown');
    if (!parent) return;
    parent.classList.toggle('collapsed')
}

// query 

const query = groq`
*[_type == "nav"][0]{
  "nav1": nav1[]->{
    _type, title, slug
  },
  "nav2": nav2[]->{
    _type, title, slug
  }
}
`;
const { data } = await useSanityQuery(query)


// blur

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
    const navItems = dropdown.value?.querySelectorAll('li');
    if (navItems) {
        navItems.forEach(item => {
            const siblings = getSiblings(item)
            item.addEventListener('mouseover', () => {
                siblings.forEach(sibling => {
                    addBlur(sibling)
                })
            })
            item.addEventListener('mouseout', () => {
                siblings.forEach(sibling => {
                    removeBlur(sibling)
                })
            })
        })
    }

}
onMounted(() => {
    initHoverFx()
})

</script>

<style lang="scss">
$collapse-bp: 800px;

.dropdown {
    position: relative;

    &:hover {
        cursor: pointer;
    }

    button {
        display: flex;
    }

    button:after {
        content: "-";
        display: flex;
        margin-left: 8px;
        width: 10px;
    }

    &.collapsed {
        button:after {
            content: "+";
        }

        ul {
            display: none;
        }
    }

    .inner-dropdown-container {
        position: absolute;
    }

    ul {
        @media (min-width: $collapse-bp) {
            position: absolute;
        }

        width: 100%;
        list-style: none;
        display: flex;
        flex-direction: column;

        li {
            white-space: nowrap;
        }

    }
}
</style>