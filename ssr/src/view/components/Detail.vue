<template>
    <div>
        <h1>Home</h1>
        <button @click="toHome">去首页</button>
        <div class="img-wrapper">
            <img
                src="https://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp"
                alt=""
            >
        </div>
    </div>
</template>

<script>
export default {
    name: 'Detail',
    mounted() {
        console.log(11);
        this.$forceUpdate();
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
