import type { RouterConfig } from "@nuxt/schema";

// transition is 0.4s
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export default <RouterConfig>{
    scrollBehavior(to, from, savedPosition) {
        const nuxtApp = useNuxtApp()
        return new Promise((resolve) => {
          nuxtApp.hook('page:finish', () => {
            delay(400).then( () => {
                resolve({
                    top: 0
                  })
            });
          })
        })
      },
};