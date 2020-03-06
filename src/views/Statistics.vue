<template>
    <Layout>
        <Tabs class-prefix="types" :data-source="recordTypeList" :value.sync="type"/>
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
    import intervalList from '@/constants/intervalList';
    import recordTypeList from '@/constants/recordTypeList';

    @Component({
        components: {Types, Tabs},
    })
    export default class Statistics extends Vue {
        type = '+';
        recordTypeList = recordTypeList;
        interval = 'day';
        intervalList = intervalList;
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