<template>
    <section class="active-project-wrapper">
        <div class="text-wrapper">
            <h2 v-if="title" class="target">{{ title }}</h2>
            <h3 v-if="location">{{ location }}</h3>
        </div>
    </section>
</template>

<script setup>
import { useActiveProjectStore } from '@/stores/activeProject'
const activeProjectStore = useActiveProjectStore()

const title = computed(() => {
    if (activeProjectStore.activeProject?.title) {
        return activeProjectStore.activeProject?.title
    } else {
        return undefined
    }
})

const location = computed(() => {
    if (activeProjectStore.activeProject?.location) {
        return activeProjectStore.activeProject?.location
    } else {
        return undefined
    }
})
</script>

<style lang="scss" scoped>
section {
    position: fixed;
    z-index: 100;
    height: 100vh;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    padding: 20px;
    mix-blend-mode: difference;

    .text-wrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        z-index: 100;

        h2 {
            font-family: 'Karl', Arial, Helvetica, sans-serif;
        }

        >* {
            color: #fff;
        }

        >*:first-child {
            text-align: left;
        }

        >*:last-child {
            text-align: right;
        }
    }

}
</style>