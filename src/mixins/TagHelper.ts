import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class TagHelper extends Vue {
    createTag() {
        const name = window.prompt('请输入标签名');
        if (name) {
            const name2 = name.trim();
            console.log(name2);
            if (name2.length === 0) {
                window.alert('标签名不能为空');
            } else {
                this.$store.commit('createTag', name);
                if (this.$store.state.createTagError) {
                    window.alert(this.$store.state.createTagError.message);
                } else {
                    window.alert('添加成功');
                }
            }
        }
    }
}

export default TagHelper;