<template>
    <Layout>
        <div class="navBar">
            <Icon @click.native="goBack"
                  class="leftIcon" name="left"/>
            <span class="title">编辑标签</span>
            <span class="rightIcon"/>
        </div>
        <div class="form-wrapper">
            <FormItem @update:value="update"
                      :value="this.currentTag.name"
                      filed-name="标签名"
                      placeholder="请输入标签名"/>
        </div>
        <div class="button-wrapper">
            <Button @click="remove">删除标签</Button>
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import FormItem from '@/components/Money/FormItem.vue';
    import Button from '@/components/Button.vue';

    @Component({
        components: {Button, FormItem}
    })
    export default class EditLabel extends Vue {
        get currentTag() {
            return this.$store.state.currentTag;
        }

        created() {
            const id = this.$route.params.id;
            this.$store.commit('fetchTags');
            this.$store.commit('setCurrentTag', id);
            if (!this.currentTag) {
                this.$router.replace('/404');
            } else {
                console.log('has tag');
            }
        }

        update(name: string) {
            if (this.currentTag) {
                this.$store.commit('updateTag', {id: this.currentTag.id, name});
            }
        }

        remove() {
            if (this.currentTag && confirm('确定删除该标签')) {
                this.$store.commit('removeTag', this.currentTag.id);
            }
        }

        goBack() {
            this.$router.back();
        }
    }
</script>

<style lang="scss" scoped>
    .navBar {
        font-size: 16px;
        padding: 12px 16px;
        background: white;
        display: flex;
        justify-content: space-between;
        align-items: center;

        > .leftIcon {
            width: 24px;
            height: 24px;
        }

        .title {

        }

        .rightIcon {
            width: 24px;
            height: 24px;
        }
    }

    .form-wrapper {
        background: white;
        margin-top: 8px;
    }

    .button-wrapper {
        text-align: center;
        padding: 16px;
        margin-top: 44-16px;
    }
</style>