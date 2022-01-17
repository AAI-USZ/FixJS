function (m) {
        var _m = require('/app/models/' + m.name),
            mName = m.name.toLowerCase();

        models[mName] = new _m(Como);
        if (m.truncate) { models[mName].truncate(); }
    }