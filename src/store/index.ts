import Vue from 'vue';
import Vuex from 'vuex';
// import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);// 把 store 绑到 Vue.prototype.$store = store

const store = new Vuex.Store({
    state: {
        recordList: [],
        tagList: [],
        currentTag: undefined
    } as RootState,
    mutations: {
        setCurrentTag(state, id: string) {
            state.currentTag = state.tagList.filter(i => i.id == id)[0];
        },
        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
        },
        createTag(state, name: string) {
            //map()方法创建一个新数组，其中填充了在调用数组中每个元素上调用提供的函数的结果.
            const names = state.tagList.map(i => i.name);
            if (names.indexOf(name) > -1) {
                window.alert('您输入的标签名重复，请重新创建标签');
            } else {
                const id = createId().toString();
                const tag = {id: id, name: name};
                state.tagList.push(tag);
                store.commit('saveTags');
                window.alert('您成功创建了新的标签');
            }
        },
        removeTag(state, id: string) {
            let index = -1;
            for (let i = 0; i < store.state.tagList.length; i++) {
                if (store.state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                store.state.tagList.splice(index, 1);
                store.commit('saveTags');
                router.back();
            } else {
                window.alert('删除失败');
            }
        },
        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },
        updateTag(state, payload: { id: string; name: string }) {
            //析构赋值，即const id = payload.id;const name = payload.name
            const {id, name} = payload;
            const idList = store.state.tagList.map(i => i.id);
            if (idList.indexOf(id) > -1) {
                const names = store.state.tagList.map(i => i.name);
                if (names.indexOf(name) > -1) {
                    window.alert('您修改的标签名已经存在，请重新修改标签名');
                } else {
                    const tag = store.state.tagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    store.commit('saveTags');
                }
            }
        },
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
        },
        createRecord(state, record) {
            const record2 = JSON.parse(JSON.stringify(record));
            record2.createdAt = new Date().toISOString();
            state.recordList.push(record2);
            store.commit('saveRecords');
        },
        saveRecords(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
        }
    },
});

export default store;
