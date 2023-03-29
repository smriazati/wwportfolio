<template>
    <div class="template-projects">
        <HeaderBasic />
        <main>
            <slot />
        </main>
    </div>
</template>

<style scoped>
.template-projects {
    min-height: 100vh
}

main {
    background: #fff;
}
</style>