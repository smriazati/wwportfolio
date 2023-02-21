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
                <div v-if="props.navType === 'nav1'" class="dropdown-inner">
                    <button>Project</button>
                    <ul v-if="data" class="dropdown-nav">
                        <li v-for="item in data?.nav1" :key="item?.slug?.current" class="unblur">
                            <NuxtLink :to="`/${item?._type}/${item?.slug?.current}`">{{ item.title }}</NuxtLink>
                        </li>
                    </ul>
                </div>
                <div v-if="props.navType === 'nav2'" class="dropdown-inner">
                    <button>Commissions</button>
                    <ul v-if="data" class="dropdown-nav">
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