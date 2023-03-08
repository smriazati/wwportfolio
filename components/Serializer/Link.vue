<template>
    <span>
        <nuxt-link :to="props.href" v-if="checkIfLocal">
            <slot />
        </nuxt-link>
        <a :href="props.href" :target="props.blank ? '_blank' : ''" v-else>
            <slot />
        </a>
    </span>
</template>
  
<script setup>
const props = defineProps(['href', 'blank'])
const checkIfLocal = computed(() => {
    if (props.href.startsWith("/")) {
        return true;
    } else {
        return false;
    }
})
</script>