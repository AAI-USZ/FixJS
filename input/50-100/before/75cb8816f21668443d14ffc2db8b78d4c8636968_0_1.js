function(id, key, value) {
        var obj = {};
        obj.command = 'UPDATE';
        obj.id = id;
        var data = {};
        data[key] = value;
        obj.data = data;
        if (debug) console.log('setProperty()', obj);
        return sendObj(obj);
    }