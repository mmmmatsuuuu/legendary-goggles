function loadFromLocalStorage(idx) {
    return JSON.parse(window.localStorage.getItem(idx));
}

function setToLocalStorage(idx, data) {
    window.localStorage.setItem(idx, JSON.stringify(data));
}

function removeLocalStorage(idx) {
    window.localStorage.removeItem(idx);
}

function clearLocalStorage() {
    window.localStorage.clear();
}