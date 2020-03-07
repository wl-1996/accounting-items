<template>
    <Layout>
        <Tabs class-prefix="types" :data-source="recordTypeList" :value.sync="type"/>
        <Tabs class-prefix="interval" :dataSource="intervalList" :value.sync="interval"/>
        <ol>
            <li v-for="(group,index) in result" :key="index">
                <h3 class="title">{{group.title}}</h3>
                <ol>
                    <li class="record" v-for="item in group.items" :key="item.id">
                        <span>{{tagString(item.tags.map(i=>i.name))}}</span>
                        <span class="notes">{{item.notes}}</span>
                        <span>￥{{item.amount}}</span>
                    </li>
                </ol>
            </li>
        </ol>
    </Layout>
</template>
<style lang="scss" scoped>
    ::v-deep {
        .types-tabs-item {
            background: white;

            &.selected {
                background: #c4c4c4;

                &::after {
                    display: none;
                }
            }
        }

        .interval-tabs-item {
            height: 48px;
        }
    }

    %item {
        padding: 0 16px;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .title {
        @extend %item;
        text-align: center;
    }

    .record {
        @extend %item;
        background: white;
    }

    .notes{
        margin-right: auto;
        margin-left: 15px;
    }
</style>
<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import intervalList from '@/constants/intervalList';
    import recordTypeList from '@/constants/recordTypeList';
    import logger from 'vuex/dist/logger';

    @Component({
        components: {Tabs},
    })
    export default class Statistics extends Vue {
        tagString(tags: Tag[]){
            return tags.join(',')
        }

        get recordList() {
            return (this.$store.state as RootState).recordList;
        }

        get result() {
            const {recordList} = this;
            type HashTableValue = { title: string; items: RecordItem[] }

            //hashTab是一个对象，对象的key是字符串，对象的value是RecordItem类型的数组：
            const hashTable: { [key: string]: hashTableValue } = {};
            for (let i = 0; i < recordList.length; i++) {
                //析构语法，
                // split() 方法使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。
                const [date, time] = recordList[i].createdAt!.split('T');
                hashTable[date] = hashTable[date] || {title: date, items: []};
                hashTable[date].items.push(recordList[i]);
            }
            console.log(hashTable);
            return hashTable;
        }

        beforeCreate() {
            this.$store.commit('fetchRecords');
        }

        type = '-';
        recordTypeList = recordTypeList;
        interval = 'day';
        intervalList = intervalList;
    }
</script>

