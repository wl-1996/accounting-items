<template>
    <div class="nav-wrapper">
        <div class="content">
            <p>我是记账页，也是首页</p>
            <p>我是记账页，也是首页</p>
            <p>我是记账页，也是首页</p>
            <p>我是记账页，也是首页</p>
            <p>我是记账页，也是首页</p>
            <p>我是记账页，也是首页</p>
            <p>我是记账页，也是首页</p>
            <p>我是记账页，也是首页</p>
            <p>我是记账页，也是首页</p>
            <p>我是记账页，也是首页</p>
            <p>我是记账页，也是首页</p>
            <p>我是记账页，也是首页</p>
            <p>我是记账页，也是首页</p>
            <p>我是记账页，也是首页</p>
            <p>我是记账页，也是首页</p>
            <p>我是记账页，也是首页</p>
            <p>我是记账页，也是首页</p>
        </div>
        <Nav/>
    </div>
</template>

<script lang="ts">

    export default {
        name: 'Money',
    };
</script>

<style lang="scss" scoped>
    .nav-wrapper {
        background: yellow;
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .content {
        flex-grow: 1;
        overflow: auto;
    }
</style>