//T的意思是接受什么类型的参数，就返回什么类型
function clone<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));

}

export default clone;