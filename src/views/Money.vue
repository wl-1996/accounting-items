<template>
    <Layout class-prefix="layout">
        {{record}}
        {{count}}
        <button @click="$store.commit('increament',4)">add</button>
        <Tags @update:value="onUpdateTags"/>
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
    import oldStore from '@/store/index2.ts';

    @Component({
        components: {FormItem, Tags, Types, NumberPad},
        computed: {
            //计算属性会更新依赖，
            //把count放到计算属性里面，当store.state.count变化时会更新count
            count() {
                return this.$store.state.count;
            }
        }
    })

    export default class Money extends Vue {
        recordList = oldStore.recordList;
        record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

        onUpdateTags(value: string[]) {
            this.record.tags = value;
        }

        onUpdateNotes(value: string) {
            this.record.notes = value;
        }

        saveRecord() {
            oldStore.createRecord(this.record);
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