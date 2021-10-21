<template>
    <div
        id="app"
        class="app"
    >
        <h1>这里是app 组件</h1>
        <div>
            <component :is="layout"></component>
        </div>
    </div>
</template>

<script>
import Layout from './Layout';

export default {
    name: 'App',
    components: {
        Layout
    },
    data() {
        return {
            layout: 'Layout'
        };
    }
};
</script>

<style scoped>

</style>
