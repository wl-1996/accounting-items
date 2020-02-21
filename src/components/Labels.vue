<template>
    <div class="nav-wrapper">
        <div class="content">
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
            <p>我是标签页</p>
        </div>
        <Nav/>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Labels',
    };
</script>

<style lang="scss" scoped>
    .nav-wrapper {
        background: yellow;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    .content {
        flex-grow: 1;
        overflow: auto;
    }
</style>