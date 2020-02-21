<template>
    <nav>
        <router-link class="item" to="/money">
            <Icon name="money"/>
            记账
        </router-link>
        <router-link class="item" to="/labels">
            <Icon name="label"/>
            标签
        </router-link>
        <router-link class="item" to="/statistics">
            <Icon name="statistics"/>
            统计
        </router-link>
    </nav>
</template>

<script lang="ts">
    export default {
        name: 'Nav',
    };
</script>

<style lang="scss" scoped>
    nav {
        display: flex;
        flex-direction: row;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
        font-size: 12px;

        > .item {
            width: 33.33333%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2px 0;

            .icon {
                width: 32px;
                height: 32px;
            }
        }
    }
</style>