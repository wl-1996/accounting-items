<template>
    <Layout class-prefix="layout">
        {{record}}
        <Tags :dataSource.sync="tags" @update:value="onUpdateTags"/>
        <Notes @update:value="onUpdateNotes"/>
        <Types :value.sync="record.type"/>
        <NumberPad :value.sync="record.amount"/>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';

    import NumberPad from '@/components/Money/NumberPad.vue';
    import Tags from '@/components/Money/Tags.vue';
    import Notes from '@/components/Money/Notes.vue';
    import Types from '@/components/Money/Types.vue';

    import {Component} from 'vue-property-decorator';

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

        onUpdateTags(value: string[]) {
            console.log(value);
            this.record.tags = value;
        }

        onUpdateNotes(value: string) {
            console.log(value);
            this.record.notes = value;
        }
    }
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column;
    }
</style>