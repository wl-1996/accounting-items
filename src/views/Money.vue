<template>
    <Layout class-prefix="layout">
        <Tags @update:value="onUpdateTags"/>
        <div class="notes">
            <FormItem placeholder="请输入备注"
                      filed-name="备注"
                      :value.sync="record.notes"
            />
        </div>
        <Tabs :value.sync="record.type"
              :data-source="recordTypeList"/>
        <NumberPad :value.sync="record.amount"
                   @submit="saveRecord"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';

    import NumberPad from '@/components/Money/NumberPad.vue';
    import Tags from '@/components/Money/Tags.vue';
    import FormItem from '@/components/Money/FormItem.vue';
    import {Component} from 'vue-property-decorator';
    import recordTypeList from '@/constants/recordTypeList';
    import Tabs from '@/components/Tabs.vue';

    @Component({
        components: {Tabs, FormItem, Tags, NumberPad},
    })

    export default class Money extends Vue {
        record: RecordItem = {
            tags: [],
            notes: '',
            type: '-',
            amount: 0
        };
        recordTypeList = recordTypeList;

        get recordList() {
            return this.$store.state.recoreList;
        }


        created() {
            this.$store.commit('fetchRecords');
        }

        onUpdateTags(value: Tag[]) {
            this.record.tags = value;
        }

        saveRecord() {
            if (!this.record.tags || this.record.tags.length === 0) {
                window.alert('请至少选择一个标签');
                return;
            } else if (this.record.amount === 0) {
                window.alert('金额不能为0，请输入金额');
            } else {
                this.$store.commit('createRecord', this.record);
                if (this.$store.state.createRecordError === null) {
                    this.record.notes = '';
                    window.alert('记账成功');
                }

            }
        }
    }
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column;
    }

    .notes {
        padding: 12px 0;
    }
</style>