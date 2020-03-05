<template>
    <Layout>
        <div class="tags">
            <router-link class="tag" :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key="tag.id">
                <span>{{tag.name}}</span>
                <Icon name="right"/>
            </router-link>
        </div>
        <div class="createTags-wrapper">
            <Button class="createTags" @click="createTag">
                新建标签
            </Button>
        </div>
    </Layout>
</template>

<script lang="ts">

    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Button from '@/components/Button.vue';
    import {mixins} from 'vue-class-component';
    import TagHelper from '@/mixins/TagHelper';

    @Component({
        components: {Button}
    })
    export default class Labels extends mixins(TagHelper) {
        get tags() {
            return this.$store.state.tagList;
        }

        created() {
            this.$store.commit('fetchTags');
        }
    }
</script>

<style lang="scss" scoped>
    .tags {
        font-size: 16px;
        background: white;
        padding-left: 16px;

        > .tag {
            min-height: 44px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e6e6e6;

            > svg {
                color: #666;
                width: 18px;
                height: 18px;
            }
        }
    }

    .createTags {
        /*color: white;*/
        /*border-radius: 4px;*/
        /*border: none;*/
        /*background: #767676;*/
        /*height: 40px;*/
        /*padding: 0 16px;*/

        &-wrapper {
            text-align: center;
            padding: 16px;
            margin-top: 44-16px;
        }
    }

</style>