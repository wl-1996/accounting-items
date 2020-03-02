import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const store = {
    //record store
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) =>
        recordListModel.create(record),


    //tag store
    tagList: tagListModel.fetch(),
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0];
    },
    createTag: (name: string) => {
        const message = tagListModel.create(name);
        if (message === 'success') {
            window.alert('您成功创建了新的标签');
        } else {
            window.alert('您输入的标签名重复，请重新创建标签');
        }
    },
    removeTag: (id: string) => {
        return tagListModel.remove(id);
    },
    updateTag: (id: string, name: string) => {
        return tagListModel.update(id, name);
    },
};
export default store;