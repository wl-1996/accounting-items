<template>
    <Layout class-prefix="layout">
        <Tags :dataSource.sync="tags"/>
        <Notes/>
        <Types/>
        <NumberPad/>
    </Layout>
</template>

<script lang="js">
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Tags from '@/components/Money/Tags.vue';
    import Notes from '@/components/Money/Notes.vue';
    import Types from '@/components/Money/Types.vue';

    export default {
        data(){
            return{
                tags: ["衣", "食", "住", "行"],
            }
        },
        name: 'Money',
        components: {Tags, Notes, Types, NumberPad},
    };
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column;
    }
</style>