<template>
    <Layout>
        <Tabs class-prefix="types" :data-source="recordTypeList" :value.sync="type"/>
        <ol v-if="groupedList.length > 0">
            <li v-for="(group,index) in groupedList" :key="index">
                <h3 class="title">
                    {{beautify(group.title)}}
                    <span>￥{{group.total}}</span>
                </h3>
                <ol>
                    <li class="record" v-for="item in group.items" :key="item.id">
                        <span>{{tagString(item.tags)}}
                        </span>
                        <span class="notes">{{item.notes}}</span>
                        <span>￥{{item.amount}}</span>
                    </li>
                </ol>
            </li>
        </ol>
        <div class="noResult" v-else>目前没有该账单明细，请记账后进行查看</div>
    </Layout>
</template>
<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import recordTypeList from '@/constants/recordTypeList';
    import dayjs from 'dayjs';
    import clone from '@/lib/clone';

    @Component({
        components: {Tabs},
    })
    export default class Statistics extends Vue {
        beautify(string: string) {
            const thatDay = dayjs(string);
            const today = dayjs();
            if (thatDay.isSame(today,
                'day')) {
                return '今天';
            } else if (thatDay.isSame(today.subtract(1, 'day'), 'day')) {
                return '昨天';
            } else if (thatDay.isSame(today.subtract(2, 'day'), 'day')) {
                return '前天';
            } else if (thatDay.isSame(today, 'year')) {
                return thatDay.format('M月D日');
            } else {
                console.log(string);
                return thatDay.format('YYYY年M月D日');
            }
        }

        tagString(tags: Tag[]) {
            return tags.length === 0 ? '无' : tags.map(i => i.name).join('，');
        }

        get recordList() {
            return (this.$store.state as RootState).recordList;
        }

        get groupedList() {
            const {recordList} = this;
            //type hashTable : {title: string, items: RecordItem[]}[]
            if (recordList.length === 0) {
                return [];
            }

            //把recordList数组克隆一份再使用，防止别人正在用recordList
            //因为下边的sort方法会改变原来的数组
            const cloneRecordList = clone(recordList);
            const newRecordList = cloneRecordList.filter(i => i.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
            //上边filter筛选后可能导致newRecordList数组为0，所以下边要判断一下：
            if (newRecordList.length === 0) {
                return [];
            }
            type Result = [
                {
                    title: string;
                    total?: number;
                    items: RecordItem[];
                }
            ]
            const result: Result = [{
                title: dayjs(newRecordList[0].createdAt).format('YYYY-M-D'),
                items: [newRecordList[0]]
            }];
            for (let i = 1; i < newRecordList.length; i++) {
                const current = newRecordList[i];
                const last = result[result.length - 1];
                if (
                    dayjs(last.title)
                        .isSame(dayjs(current.createdAt), 'day')
                ) {
                    last.items.push(current);
                } else {
                    result.push(
                        {
                            title: dayjs(current.createdAt).format('YYYY-M-D'),
                            items: [current]
                        }
                    );
                }
            }
            result.map(group => {
                group.total = group.items
                    .reduce((sum, item) => {
                        return sum + item.amount;
                    }, 0);
            });
            return result;
        }

        beforeCreate() {
            this.$store.commit('fetchRecords');
        }


        type = '-';
        recordTypeList = recordTypeList;
    }
</script>

<style lang="scss" scoped>
    .noResult {
        padding: 16px;
        display: flex;
        justify-content: center;
    }

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

    .notes {
        margin-right: auto;
        margin-left: 15px;
    }
</style>


