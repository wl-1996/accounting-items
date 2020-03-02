<template>
    <Layout class-prefix="  layout">
        <Tags :dataSource.sync="tags" @update:value="onUpdateTags"/>
        <div class="notes">
            <FormItem :placeholder="'请输入备注'"
                      :filed-name="'备注'"
                      @update:value="onUpdateNotes"/>
        </div>
        <Types :value.sync="record.type"/>
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

    @Component({
        components: {FormItem, Tags, Types, NumberPad},
    })
    export default class Money extends Vue {
        record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};
        tags = window.tagList;
        recordList = window.recordList;

        onUpdateTags(value: string[]) {
            this.record.tags = value;
        }

        onUpdateNotes(value: string) {
            this.record.notes = value;
        }

        saveRecord() {
            window.createRecord(this.record);
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