<template>
    <div>
        <h1>Home</h1>
        <button @click="toHome">去首页</button>
        <pre>
        {{ JSON.stringify($data, null, 2) }}
      </pre>
    </div>
</template>

<script>
export default {
    name: 'Detail',
    data() {
        return {
            // eslint-disable-next-line no-underscore-dangle
            ...typeof window === 'object' ? window.__INITIAL_STATE__ : {}
        };
    },
    methods: {
        toHome() {
            this.$router.push({
                name: 'home'
            });
        }
    }
};
</script>

<style scoped>

</style>
