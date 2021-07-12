<template>
    <div>
        <h1>Home</h1>
        <button @click="toDetail">Detail 1111</button>
        <pre>
          {{ JSON.stringify(storeData, null, 2) }}
        </pre>
    </div>
</template>

<script>
export default {
    name: 'Home',
    computed: {
        // 从 store 的 state 对象中的获取 item。
        storeData() {
            return this.$store.state.data;
        }
    },
    asyncData({ store, route }) {
        // 触发 action 后，会返回 Promise
        return store.dispatch('fetchData', 'Home');
    },
    mounted() {
    },
    methods: {
        toDetail() {
            this.$router.push({
                name: 'detail'
            });
        }
    }
};
</script>

<style scoped>

</style>
