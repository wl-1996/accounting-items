<template>
    <Layout class-prefix="layout">
        {{recordList}}
        <Tags @update:value="onUpdateTags"/>
        <div class="notes">
            <FormItem :placeholder="'请输入备注'"
                      :filed-name="'备注'"
                      @update:value="onUpdateNotes"/>
        </div>
        <Tabs :value.sync="record.type" :data-source="recordTypeList"/>
        <NumberPad :value.sync="record.amount"
                   @submit="saveRecord"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';

    import NumberPad from '@/components/Money/NumberPad.vue';
    import Tags from '@/components/Money/Tags.vue';
    import FormItem from '@/components/Money/FormItem.vue';
    import Types from '@/components/Money/Types.vue';
    import {Component} from 'vue-property-decorator';
    import recordTypeList from '@/constants/recordTypeList';
    import Tabs from '@/components/Tabs.vue';

    @Component({
        components: {Tabs, FormItem, Tags, Types, NumberPad},
    })

    export default class Money extends Vue {
        record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};
        recordTypeList = recordTypeList;

        get recordList() {
            return this.$store.state.recoreList;
        }


        created() {
            this.$store.commit('fetchRecords');
        }

        onUpdateTags(value: string[]) {
            this.record.tags = value;
        }

        onUpdateNotes(value: string) {
            this.record.notes = value;
        }

        saveRecord() {
            this.$store.commit('createRecord', this.record);
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