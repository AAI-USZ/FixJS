function (m) {
        var obj = (typeof m === 'object'),
            _m = require('/app/models/' + (obj ? m.name : m)),
            mName = obj ? m.name.toLowerCase() : m.toLowerCase();

        models[mName] = new _m(Como);
    }