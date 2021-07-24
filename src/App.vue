<template>
  <div id="app">
    <div class="container" id="nav">
      <h1><b>รายรับ-รายจ่าย</b></h1>
      <br>
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px 0px;
}
</style>
