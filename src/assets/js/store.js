
export function saveToLocal(id,key,value) {
    let data = window.localStorage._data_;
    if(!data) {
        data = {};
        data[id] = {};
        data[id][key] = value;
    }else{
        data = JSON.parse(data);
        if(!data[id]){
            data[id] = {};
        }
    }
    data[id] = value;
    window.localStorage._data_ = JSON.stringify(data);
};

export function loadFromLocal(id,key,def) {
    let data = window.localStorage._data_;
    if(!data) {
        return def;
    }
    data = JSON.parse(data)[id];
    if(!data) {
        return def;
    }
    let ret = data[key];
    return ret || def;


}