function arrayize(arr) {
    return typeof arr === 'undefined' ? [] : Array.prototype.concat(arr);
}