<template>
    <Layout class-prefix="layout">
        {{record}}
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

    type Record = {
        tags: string[];
        notes: string;
        type: string;
        amount: number;
    }

    @Component({
        components: {Tags, Notes, Types, NumberPad},
    })
    export default class Money extends Vue {
        record: Record = {tags: [], notes: '', type: '-', amount: 0};
        tags = ['衣', '食', '住', '行'];
        recordList: Record[] = [];

        onUpdateTags(value: string[]) {
            console.log(value);
            this.record.tags = value;
        }

        onUpdateNotes(value: string) {
            console.log(value);
            this.record.notes = value;
        }

        saveRecord() {
            const record2 = JSON.parse(JSON.stringify(this.record));
            this.recordList.push(record2);
            console.log(this.recordList);
        }

        @Watch('recordList')
        onRecordListChanged() {
            window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
        }
    }
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column;
    }
</style>