<template>
    <div :class="$style.box">
        <h1>这是Layout组件</h1>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Layout',
    data() {
        return {};
    },
    created() {
    },
    mounted() {
    },
    methods: {}
};
</script>

<style module>
.box {

}
</style>
