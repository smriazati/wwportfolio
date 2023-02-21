<template>
    <section ref="panel">
        <div class="bts-wrapper">
            <ul class="grid">
                <li v-for="item in randomImages" :key="_id">
                    <NuxtLink :to="`/${item.type === 'project' ? 'project' : 'client'}/${item.slug?.current}`">
                        <div v-if="item.img.url" class="image-wrapper">
                            <img :src="$urlFor(item.img.url).url()" :alt="item.img.alt" />
                        </div>
                        <div v-if="item.img.alt" class="text-wrapper">
                            <p>{{ item.img.alt }}</p>
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </section>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const query = groq`
*[_type=="project" && defined(process)]{
 "bts": process[].asset->{
   "url": url,
    "alt": altText
 },
  slug,
  _type,
  _id
}
`;
const { data } = await useSanityQuery(query)

const allItems = computed(() => data.value.map(data => {
    let slug = data.slug
    let type = data._type
    let result = data.bts.map(item => {
        const result = {
            slug: slug,
            type: type,
            img: item
        }
        return result
    })
    return result
}).flat())

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

const randomImages = computed(() => {
    const shuffledArray = shuffle(allItems.value);
    console.log(allItems.value, shuffledArray)
    return allItems.value.slice(0, 2)
})

const panel = ref();
const timer = ref();
const toggleBgColor = () => {
    const parent = panel.value.closest('.home-layout');
    parent.classList.toggle('dark');
}

onMounted(() => {
    ScrollTrigger.create({
        trigger: panel.value,
        start: `top bottom`,
        // markers: true,
        onToggle: toggleBgColor
    });

    timer.value = setTimeout(() => {
        refreshScrollTrigger()
    }, 100);
});

onUnmounted(() => {
    ScrollTrigger.killAll()
    timer.value = null
})

const refreshScrollTrigger = () => {
    ScrollTrigger.refresh()
}



</script>

<style lang="scss" scoped>
.grid {
    min-height: 110vh;
    padding: 15vh 20px;

    >*:first-child {
        grid-column: 1 / span 3;
        grid-row: 1 / 2;
    }

    >*:last-child {
        grid-column: 5 / span 4;
        grid-row: 1 / 2;
        place-self: end;
    }

    .text-wrapper {
        margin-top: 20px;
    }
}
</style>