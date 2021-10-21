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
      <div>
        <img
          :src="imgUrl"
          alt=""
          class="page-img"
          :style="{
            width: width,
            height: height
          }"
        >
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
const ChildImg = () => import('@/components/Img.vue')

const webpObj = {
  1: 'https://t150.test.klook.io/_klook/img/1-7cb3b4.webp',
  5: 'https://t150.test.klook.io/_klook/img/5-6d16bb.webp',
}

const gifObj= {
  1: 'https://t150.test.klook.io/_klook/img/1-f601b4.gif',
  5: 'https://t150.test.klook.io/_klook/img/5-e6da9e.gif',
}

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
  computed: {
    routeQuery() {
      return this.$route.query
    },
    type() {
      return this.routeQuery.type || '1'
    },
    format() {
      return this.routeQuery.format || 'webp'
    },
    imgUrl() {
      const dataObj = this.format === 'webp' ? webpObj : gifObj
      return dataObj[this.type] || dataObj[1]
    },

    width() {
      if (this.routeQuery.width) { return `${this.routeQuery.width}px` }

      if (this.platform === 'desktop') { return '260px' }

      return '200px'
    },

    height() {
      const routeHeight = this.routeQuery.height || this.routeQuery.width
      if (routeHeight) { return `${routeHeight}px` }
      if (this.platform === 'desktop') { return '260px' }

      return '200px'
    }
  },
  data() {
    return {
      platform: 'desktop',
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
