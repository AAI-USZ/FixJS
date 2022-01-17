function (name, func) {
    if (!listeners[name]) {
        listeners[name] = [];
    }
    listeners[name].push(func);
    return exports;
}