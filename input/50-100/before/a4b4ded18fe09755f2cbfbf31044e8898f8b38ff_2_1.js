functionsToSymbols = function(functions) {
    var arr = [];
    for (var i in functions) {
        if (functions.hasOwnProperty(i)) {
            arr.push({ name: i, func: functions[i] });
        }
    }
    return arr;
}