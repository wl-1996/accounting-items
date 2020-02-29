const localStorageKeyName = 'tagList';
type Tag = {
    id: string;
    name: string;
}
type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => 'success' | 'duplicated';
    save: () => void;
}
const tagListModel: TagListModel = {
    data: [],
    fetch() {
        this.data =
            JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    create(name) {
        //map()方法创建一个新数组，其中填充了在调用数组中每个元素上调用提供的函数的结果.
        const names = this.data.map(item => item.name);
        if (names.indexOf(name) > -1) {
            return 'duplicated';
        } else {
            this.data.push({
                id: name,
                name: name
            });
            this.save();
            return 'success';
        }
    }
};

export default tagListModel;