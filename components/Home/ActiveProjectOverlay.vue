<script setup>
const props = defineProps(['title', 'location'])
// console.log(props.title, props.location)
</script>

<template>
    <section class="active-project-wrapper">
        <div class="text-wrapper">
            <h2 v-if="props.title">{{ props.title }}</h2>
            <h3 v-if="props.location">{{ props.location }}</h3>
        </div>
    </section>
</template>


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

    .text-wrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        z-index: 100;

        >*:first-child {
            text-align: left;
        }

        >*:last-child {
            text-align: right;
        }
    }

}
</style>