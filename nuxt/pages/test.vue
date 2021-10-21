<template>
  <div>
    <Test></Test>
  </div>
</template>

<script>
const Test = () => import('@/components/Test.vue')

export default {
  components: {
    Test
  }
}
</script>
