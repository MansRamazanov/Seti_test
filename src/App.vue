<template>
  <header class="header">
    <div class="search-container">
      <div class="search">
        <img
          src="./img/search-icon.svg"
          alt="иконка поиска"
          class="search-icon"
        />
        <input class="search-input" type="text" placeholder="Имя персонажа" />
        <select class="search-select" name="status">
          <option class="search-select-option" value="">Status</option>
          <option class="search-select-option" value="alive">Alive</option>
          <option class="search-select-option" value="dead">Dead</option>
          <option class="search-select-option" value="unknown">Unknown</option>
        </select>
      </div>
    </div>
    <img
      src="./img/Rick_and_Morty.svg.png"
      alt="логотип Рик и Морти"
      class="logo"
    />
    <h1 class="header-text">Mansur Ramazanov Test</h1>
  </header>
  <main class="main">
    <router-link to="/"></router-link>
    <router-view />
  </main>
</template>

<script></script>

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

.search-input {
  margin-left: 10px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #444;
  color: white;
}

.search-select {
  margin-left: 10px;
  background: transparent;
  border: none;
  color: white;
}

.search-select-option {
  color: black;
}

.search-container {
  display: inline-block;
}

.search-icon {
  max-width: 30px;
}

.search {
  display: flex;
  align-items: stretch;
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
