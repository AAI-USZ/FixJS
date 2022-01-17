function(o) {
        var str = [];
        Object.keys(o).forEach(function(name) {
            str.push(name + ': ' + o[name]);
        });
        return str.join('\n');
    }