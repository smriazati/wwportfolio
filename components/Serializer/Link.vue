<template>
    <span>
        <nuxt-link :to="props.destination ? props.destination : '/'" v-if="checkIfLocal">
            <slot />
        </nuxt-link>
        <a :href="props.href" :target="props.blank ? '_blank' : ''" v-else>
            <slot />
        </a>
    </span>
</template>
  
<script setup>
const props = defineProps(['type', 'destination', 'href', 'blank'])
const checkIfLocal = computed(() => {
    if (props.type == 'internal') {
        return true;
    } else {
        return false;
    }
})
</script>