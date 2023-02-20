<script setup>
const props = defineProps(['navType'])

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

function toggleDropdown(e) {
    const parent = e.target.closest('.dropdown');
    if (!parent) return;
    parent.classList.toggle('collapsed')
}

</script>

<template>
    <div>
        <Suspense>
            <div class="dropdown collapsed" ref="dropdown" @click="(e) => toggleDropdown(e)">
                <div v-if="props.navType === 'nav1'">
                    <span>Project</span>
                    <ul v-if="data">
                        <li v-for="item in data?.nav1" :key="item?.slug?.current" class="unblur">
                            <NuxtLink :to="`/${item?._type}/${item?.slug?.current}`">{{ item.title }}</NuxtLink>
                        </li>
                    </ul>
                </div>
                <div v-if="props.navType === 'nav2'">
                    <span>Commissions</span>
                    <ul v-if="data">
                        <li v-for="item in data?.nav2" :key="item?.slug?.current" class="unblur">
                            <NuxtLink :to="`/${item?._type}/${item?.slug?.current}`">{{ item.title }}</NuxtLink>
                        </li>
                    </ul>
                </div>

            </div>
        </Suspense>
    </div>
</template>

<style lang="scss">
.dropdown {
    position: relative;

    &:hover {
        cursor: pointer;
    }

    span {
        display: flex;
    }

    span:after {
        content: "-";
        display: flex;
        margin-left: 8px;
        width: 10px;
    }

    &.collapsed {
        span:after {
            content: "+";
        }

        ul {
            display: none;
        }
    }

    ul {
        position: absolute;
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