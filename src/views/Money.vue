<template>
    <Layout class-prefix="  layout">
        {{recordList}}
        <Tags :dataSource.sync="tags" @update:value="onUpdateTags"/>
        <Notes @update:value="onUpdateNotes"/>
        <Types :value.sync="record.type"/>
        <NumberPad :value.sync="record.amount"
                   @submit="saveRecord"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';

    import NumberPad from '@/components/Money/NumberPad.vue';
    import Tags from '@/components/Money/Tags.vue';
    import Notes from '@/components/Money/Notes.vue';
    import Types from '@/components/Money/Types.vue';
    import {Component, Watch} from 'vue-property-decorator';
    import recordListModel from '@/models/recordListModel';
    import tagListModel from '@/models/tagListModel';

    const recordList = recordListModel.fetch();
    const tagList = tagListModel.fetch();

    @Component({
        components: {Tags, Notes, Types, NumberPad},
    })
    export default class Money extends Vue {
        record: RecordItem = {tags: [], notes: '', type: '-', amount: 0, createdAt: new Date()};
        tags = tagList;
        recordList: RecordItem[] = recordList;

        onUpdateTags(value: string[]) {
            this.record.tags = value;
        }

        onUpdateNotes(value: string) {
            this.record.notes = value;
        }

        saveRecord() {
            const record2: RecordItem = recordListModel.clone(this.record);
            // record2.createAt = new Date();
            this.recordList.push(record2);
        }

        @Watch('recordList')
        onRecordListChanged() {
            recordListModel.save(this.recordList);
        }
    }
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column;
    }
</style>