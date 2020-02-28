const localStorageKeyName = 'tagList';
type TagListModel = {
    data: string[];
    fetch: () => string[];
    create: (name: string) => 'success'|'duplicated';
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
        if (this.data.indexOf(name) > -1) {
            return 'duplicated';
        } else {
            this.data.push(name);
            this.save();
            return 'success';
        }
    }
};
export default tagListModel;