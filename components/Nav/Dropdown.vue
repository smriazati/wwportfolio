<template>
    <div>
        <Suspense>
            <div class="dropdown collapsed" ref="dropdown">
                <div v-if="props.navType === 'nav1'" class="dropdown-inner">
                    <button @click="(e) => toggleDropdown(e)" @mouseover="setActiveProjectType('research')"
                        @mouseout="clearActiveProjectType">Research</button>
                    <ul v-if="data" class="dropdown-nav">
                        <li v-for="item in data?.nav1" :key="item?.slug?.current" class="unblur"
                            @mouseover="setActiveProject(item.title, item.location)" @mouseout="clearActiveProject"
                            @click="collapseOtherDropdowns">
                            <NuxtLink :to="`/project/${item?.slug?.current}`">{{ item.title }}</NuxtLink>
                        </li>
                    </ul>
                </div>
                <div v-if="props.navType === 'nav2'" class="dropdown-inner">
                    <button @click="(e) => toggleDropdown(e)" @mouseover="setActiveProjectType('commission')"
                        @mouseout="clearActiveProjectType">Commissions</button>
                    <ul v-if="data" class="dropdown-nav">
                        <li v-for="item in data?.nav2" :key="item?.slug?.current" class="unblur"
                            @mouseover="setActiveProject(item.title, item.location)" @mouseout="clearActiveProject"
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
import { useActiveProjectStore } from '@/stores/activeProject'

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
    _type, title, slug, location
  },
  "nav2": nav2[]->{
    _type, title, slug, location
  }
}
`;
const { data } = await useSanityQuery(query)

const activeProjectStore = useActiveProjectStore()

function setActiveProject(title, location) {
    activeProjectStore.setActiveProject(title, location)
}

function clearActiveProject(e) {
    activeProjectStore.clearActiveProject()
}

function setActiveProjectType(type) {
    activeProjectStore.setActiveProjectType(type)
}

function clearActiveProjectType(e) {
    activeProjectStore.clearActiveProjectType()
}

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

body {
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    height: 100vh;
    overflow: hidden;
    display: flex;
    font-family: 'Anton', sans-serif;
    justify-content: center;
    align-items: center;
}

$shooting-time: 3000ms;

.night {
    position: relative;
    width: 100%;
    height: 100%;
    transform: rotateZ(45deg);
    // animation: sky 200000ms linear infinite;
}

.shooting_star {
    position: absolute;
    left: 50%;
    top: 50%;
    // width: 100px;
    height: 2px;
    background: linear-gradient(-45deg, rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
    border-radius: 999px;
    filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
    animation:
        tail $shooting-time ease-in-out infinite,
        shooting $shooting-time ease-in-out infinite;

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: calc(50% - 1px);
        right: 0;
        // width: 30px;
        height: 2px;
        background: linear-gradient(-45deg, rgba(0, 0, 255, 0), rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
        transform: translateX(50%) rotateZ(45deg);
        border-radius: 100%;
        animation: shining $shooting-time ease-in-out infinite;
    }

    &::after {
        transform: translateX(50%) rotateZ(-45deg);
    }

    @for $i from 1 through 20 {
        &:nth-child(#{$i}) {
            $delay: random(9999)+0ms;
            top: calc(50% - #{random(400) - 200px});
            left: calc(50% - #{random(300) + 0px});
            animation-delay: $delay;
            // opacity: random(50) / 100 + 0.5;

            &::before,
            &::after {
                animation-delay: $delay;
            }
        }
    }
}

@keyframes displayFlexToNone {
    0% {
        display: flex;
    }

    100% {
        display: none;
    }
}

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

    @media (min-width :$collapse-bp) {
        ul {
            display: flex;
            transition: .4s ease-out filter;
            filter: blur(0px);
        }
    }

    &.collapsed {


        button:after {
            content: "+";
        }

        ul {
            @media (min-width :$collapse-bp) {
                filter: blur(50px);
                display: none;
            }

            @media (max-width :$collapse-bp) {
                display: none;
            }
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