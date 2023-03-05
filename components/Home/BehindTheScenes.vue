<template>
    <section ref="panel">
        <div class="bts-wrapper">
            <ul class="grid" v-if="randomImages">
                <li v-for="item in randomImages" :key="item.id">
                    <NuxtLink :to="`/project/${item.slug?.current}`">
                        <figure v-if="item.img">
                            <div v-if="item.img.url" class="image-wrapper">
                                <img :src="$urlFor(item.img.url).url()" :alt="item.img.alt" />
                            </div>
                            <div class="text-wrapper">
                                <p>{{ item.img.alt }}</p>
                            </div>
                        </figure>
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

    const flatList = data.value.flatMap(item => {
        // console.log('item! slug', item.slug.current, 'type', item._type, 'bts list', item.bts)
        const listItems = item.bts.map((subItem) => {
            // console.log('subitem! slug', item.slug.current, 'type', item._type, 'bts img', subItem.url, 'bts caption', subItem.alt)
            const result = {
                slug: item.slug,
                type: item._type,
                id: item._id,
                img: subItem
            }
            return result
        })
        return listItems
    })
    const randomImages = shuffle(flatList).slice(0, 2);
    return randomImages
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
        start: `top+=300px bottom`,
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

    img {
        max-height: 85vh;
    }
}
</style>