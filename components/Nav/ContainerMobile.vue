<template>
    <div class="nav-container grid">

        <nav ref="nav">
            <ul class="main-nav">
                <li>
                    <h1 ref="brand">
                        <NuxtLink to="/">Will Warasila</NuxtLink>
                    </h1>
                </li>
                <li class="parent-dropdown-container dropdown collapsed">
                    <button @click="(e) => toggleDropdown(e)">Projects</button>
                    <ul class="inner-dropdown-container">
                        <li class="has-dropdown">
                            <NavDropdown navType="nav1"></NavDropdown>
                        </li>
                        <li class="has-dropdown">
                            <NavDropdown navType="nav2"></NavDropdown>
                        </li>
                    </ul>
                </li>
                <li>
                    <NuxtLink to="/about">About</NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script setup>
function toggleDropdown(e) {
    const parent = e.target.closest('.dropdown');
    if (!parent) return;
    parent.classList.toggle('collapsed')
}

</script>

<style lang="scss" scoped>
$collapse-bp: 800px;

.grid {
    // grid-template-columns: repeat(9, 1fr);
    // grid-gap: 0;

    // >*:first-child {
    //     grid-column: 1 / span 3;
    //     align-self: end;
    // }

    // >*:last-child {
    //     grid-column: 4 / span 6;
    // }

    // .main-nav>li:first-child button {
    //     text-align: center;
    //     margin-left: auto;
    //     margin-right: auto;
    // }

    .main-nav li:last-child {
        text-align: right;
    }

    display: flex;
    justify-content: space-between;
}

nav {
    width: 100%;
}

ul.main-nav {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

// ul.main-nav {
//     display: grid;
//     grid-template-columns: repeat(2, 1fr);
//     grid-gap: 25px;
//     width: 100%;
//     align-items: flex-end;
// }
</style>