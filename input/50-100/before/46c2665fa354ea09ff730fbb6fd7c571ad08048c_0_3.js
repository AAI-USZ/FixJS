function(name, data) {
    if (!listeners[name]) return;
    for (var l in listeners[name]) listeners[name][l](data);
    return exports;
}