<template>
  <div class="container">
    <h1>First App</h1>
    <div class="content">
      <div class="asset-box" style="margin-top: 20px;">
        <img src="@/assets/png.png" alt="" style="max-width: 200px; height: auto;">
      </div>
      <div class="static-box" style="margin-top: 20px;">
        <img src="/static.png" alt="" style="max-width: 200px; height: auto;">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'test',
  middleware: 'auth',
  // fetch() {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       console.log('fetch');
  //       resolve();
  //     }, 3000);
  //   });
  // },
  asyncData(context) {
    return new Promise((resolve) => {
      console.log('async data');
      resolve({
        title: 'This is test page',
        subTitle: 'This is subtitle'
      });
    });
  },
  created() {
  },
  data() {
    return {
     title: '',
     testKey: '1111'
   };
  },
  mounted() {
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
