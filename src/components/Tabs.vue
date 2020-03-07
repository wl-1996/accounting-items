<template>
    <div>
        <ul class="tabs">
            <li class="tabs-item" v-for="item in this.dataSource" :key="item.value"
                :class="liClass(item)" @click="select(item)">{{item.text}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    type dataSourceItem = {
        text: string;
        value: string;
    }

    @Component
    export default class Tabs extends Vue {
        @Prop(String) readonly value!: string;
        @Prop(String) readonly classPrefix?: string;
        @Prop({required: true, type: Array})
        dataSource!: dataSourceItem[];

        liClass(item: dataSourceItem) {
            return {
                selected: item.value === this.value, [this.classPrefix + '-tabs-item']: this.classPrefix
            };
        }

        select(item: dataSourceItem) {
            this.$emit('update:value', item.value);
        }
    }
</script>

<style lang="scss" scoped>
    .tabs {
        background: #c4c4c4;
        display: flex;
        text-align: center;
        font-size: 24px;

        &-item {
            width: 50%;
            height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            &.selected::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: #333;
            }
        }
    }

    /*.tabs{*/
    /*    display: flex;*/
    /*    flex-direction: row;*/
    /*    justify-content: space-between;*/
    /*}*/
</style>