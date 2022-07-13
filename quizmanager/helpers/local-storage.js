export function getStorageItem(key) {
    let item = localStorage[key];
    if (!item) return;
    item = JSON.parse(item);
    return item;
}

export function setStorageItem(key, value) {
    let item = localStorage[key];
    if (item) {
        item = JSON.parse(item);
    }

    item = Object.assign(item || {}, value);
    item = JSON.stringify(item);
    localStorage[key] = item;
}