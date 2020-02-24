<template>
    <Layout class-prefix="layout">
        <Tags/>
        <Notes/>
        <Types xxx="hi"/>
        <NumberPad/>
    </Layout>
</template>

<script lang="ts">
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Tags from '@/components/Money/Tags.vue';
    import Notes from '@/components/Money/Notes.vue';
    import Types from '@/components/Money/Types.vue';

    export default {
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