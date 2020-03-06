<template>
    <Layout>
        <Tabs class-prefix="types" :data-source="typeList" :value.sync="type"/>
        <Tabs class-prefix="interval" :dataSource="intervalList" :value.sync="interval"/>
        <div>
            type:{{type}}
            <br>
            interval:{{interval}}
        </div>
    </Layout>
</template>

<script lang="ts">
    import Types from '@/components/Money/Types.vue';
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';

    @Component({
        components: {Types, Tabs},
    })
    export default class Statistics extends Vue {
        type = '+';
        typeList = [{text: '支出', value: '-'}, {text: '收入', value: '+'}];
        interval = 'day';
        intervalList = [{text: '按天', value: 'day'}, {text: '按周', value: 'week'}, {text: '按月', value: 'month'}];
    }
</script>

<style lang="scss" scoped>
    ::v-deep .types-tabs-item, ::v-deep .interval-tabs-item {
        background: white;

        &.selected {
            background: #c4c4c4;

            &::after {
                display: none;
            }
        }
    }
</style>