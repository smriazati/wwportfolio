function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export default {
  scrollBehavior() {
    return new Promise((resolve) => {
      delay(400).then(() => {
        resolve({
          top: 0
        })
      });
    })
  },
}
