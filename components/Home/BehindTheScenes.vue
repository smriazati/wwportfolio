<template>
    <div>
        <section ref="panel" v-if="hasImages">
            <div class="bts-wrapper">
                <ul class="grid">
                    <ClientOnly>
                        <HomeBTSItem v-for="item in randomImages" :key="item.id" :data="item">
                        </HomeBTSItem>
                    </ClientOnly>
                </ul>
            </div>
        </section>
    </div>
</template>
<script setup>
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

const hasImages = computed(() => {
    if (randomImages.value.length > 0) {
        return true;
    }
}
)

const randomImages = ref([]);
const setRandomImages = () => {
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
    const justTwoImages = shuffle(flatList).slice(0, 2);
    randomImages.value = justTwoImages
}
setRandomImages();

const panel = ref();
const timer = ref();
const toggleBgColor = () => {
    const parent = panel.value.closest('.home-layout');
    parent.classList.toggle('dark');
}

onMounted(() => {
    refreshScrollTrigger()
    ScrollTrigger.create({
        trigger: panel.value,
        start: `top+=500px bottom`,
        // markers: true,
        onToggle: toggleBgColor
    });

    timer.value = setTimeout(() => {
        refreshScrollTrigger()
    }, 500);
});

onUnmounted(() => {
    ScrollTrigger.killAll()
    timer.value = null
})

const refreshScrollTrigger = () => {
    ScrollTrigger.refresh()
}

</script>


<style lang="scss">
.bts-wrapper .grid {
    min-height: 110vh;
    padding: 15vh 20px;
    display: flex;
    flex-direction: column;

    >* {
        max-width: 70vw;

        &:last-child {
            align-self: end;
        }
    }

    img {
        max-height: 100vh;
    }

    .text-wrapper {
        margin-top: 20px;
    }


    li:nth-child(even) {
        text-align: right;
    }
}
</style>