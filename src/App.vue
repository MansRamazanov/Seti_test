<template>
  <header class="header">
    
    <RouterLink :to="{name: 'home'}"><img
      src="./img/Rick_and_Morty.svg.png"
      alt="логотип Рик и Морти"
      class="logo"
    />
            </RouterLink>
    
  </header>
  <main class="main">
    <router-link to="/"></router-link>
    <router-view />
  </main>
</template>

<script>

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100vw;
  height: 100vh;
  background-image: url("./img/2020-07-rick-and-morty-4k-8k-free-ultra-hd-pictures-backgrounds-images1.jpg");
  background-size: 100vw 100vh;
}

.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.header-text {
  color: azure;
  display: inline-block;
  font-size: 20px;
}


.logo {
  max-width: 200px;
}

.main {
  width: 80vw;
  height: 50vh;
  margin: 0 auto;
  margin-top: 50px;
}
</style>
