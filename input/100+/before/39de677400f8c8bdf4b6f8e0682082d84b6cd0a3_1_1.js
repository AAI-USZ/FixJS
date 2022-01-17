function (r) {
        var require = r.require,
            name = require.name,
            path = r.path;

        if (r.require.type == 'simple') {
            f.removeChild(require.node);
            console.log('removing', name);

            if (!f.children.length && f == path[1][0]) {
                console.log('removing empty declarations')
                path[1][1][1][0].removeChild(path[1][0]);
            }
        }
    }