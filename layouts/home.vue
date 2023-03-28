<template>
  <div class="home-layout">
    <HeaderHome />
    <slot />
  </div>
</template>

<style lang="scss">
.home-layout .site-header {
  mix-blend-mode: difference;
  position: relative;
  z-index: 1111;

  a,
  button {
    color: #fff;
  }
}
</style>