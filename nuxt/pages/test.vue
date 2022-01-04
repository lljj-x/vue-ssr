<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <div class="content">
      <div v-if="false" class="asset-box" style="margin-top: 20px;">
        <img src="@/assets/png.png" alt="" style="max-width: 200px; height: auto;">
      </div>
      <div class="static-box" style="margin-top: 20px;">
        <img src="/static.png" alt="" style="max-width: 200px; height: auto;">
        <child-img></child-img>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
const ChildImg = () => import('@/components/Img.vue')

export default Vue.extend({
  layout: 'test',
  components: {
    ChildImg
  },
  asyncData(context) {
    return new Promise((resolve) => {
      resolve({
        title: 'Test page',
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
    this.$forceUpdate()
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 400px;
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
