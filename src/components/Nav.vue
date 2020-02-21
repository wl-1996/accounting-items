<template>
    <div class="nav">
        <router-link to="/money">
            <Icon name="money"/>
            记账页
        </router-link>
        |
        <router-link to="/labels">
            <Icon name="label"/>
            标签页
        </router-link>
        |
        <router-link to="/statistics">
            <Icon name="statistics"/>
            统计页
        </router-link>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Nav',
    };
</script>

<style lang="scss" scoped>
    .nav {
        border: 1px solid blue;
    }
</style>