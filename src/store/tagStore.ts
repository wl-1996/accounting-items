import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';
const tagStore = {
    tagList: [] as Tag[],
    saveTags() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
    },
    fetchTags() {
        this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as Tag[];
        return this.tagList;
    },
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0];
    },
    createTag(name: string) {
        //map()方法创建一个新数组，其中填充了在调用数组中每个元素上调用提供的函数的结果.
        const names = this.tagList.map(item => item.name);
        if (names.indexOf(name) > -1) {
            window.alert('您输入的标签名重复，请重新创建标签');
            return 'duplicated';
        } else {
            const id = createId().toString();
            this.tagList.push({
                id: id,
                name: name
            });
            this.saveTags();
            window.alert('您成功创建了新的标签');
            return 'success';
        }
    },
    removeTag(id: string) {
        let index = -1;
        for (let i = 0; i < this.tagList.length; i++) {
            if (this.tagList[i].id === id) {
                index = i;
                break;
            }
        }
        this.tagList.splice(index, 1);
        this.saveTags();
    },
    updateTag(id: string, name: string) {
        const idList = this.tagList.map(item => item.id);
        if (idList.indexOf(id) > -1) {
            const names = this.tagList.map(item => item.name);
            if (names.indexOf(name) > -1) {
                return 'duplicated';
            } else {
                const tag = this.tagList.filter(item => item.id === id)[0];
                tag.name = name;
                this.saveTags();
                return 'success';
            }
        } else {
            return 'not found';
        }
    },
};

tagStore.fetchTags();

export default tagStore;