function (name, func) {
    for (var l in listeners[name]) {
        if (listeners[name][l] === func) {
            listeners[name].splice(l, 1);
            break;
        }
    }
    return exports;
}