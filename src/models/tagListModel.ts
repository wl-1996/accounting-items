import createId from '@/lib/createId';

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
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
    remove: (id: string) => boolean;
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
            const id = createId().toString();
            this.data.push({
                id: id,
                name: name
            });
            this.save();
            return 'success';
        }
    },
    //id指的是要修改标签的id，name是该id对应的tag要修改成的name
    update(id, name) {
        const idList = this.data.map(item => item.id);
        if (idList.indexOf(id) > -1) {
            const names = this.data.map(item => item.name);
            if (names.indexOf(name) > -1) {
                return 'duplicated';
            } else {
                const tag = this.data.filter(item => item.id === id)[0];
                tag.name = name;

                // tag.id = name;
                this.save();
                return 'success';
            }
        } else {
            return 'not found';
        }
    },
    remove(id: string) {
        let index = -1;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i;
                break;
            }
        }
        this.data.splice(index, 1);
        this.save();
        return true;
    }
};

export default tagListModel;