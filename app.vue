<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>


<script lang="ts" setup></script>

<style lang="scss">
#app {
  padding: 10px 5%;

  @media only screen and (max-width: 800px) {
    padding: 10px 20%;
  }

  @media only screen and (max-width: 500px) {
    padding: 10px;
  }
}
</style>
