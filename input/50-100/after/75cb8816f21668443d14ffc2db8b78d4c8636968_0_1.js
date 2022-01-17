function(id, key, value, recursive) {
        var obj = {};
        obj.command = 'UPDATE';
        obj.id = id;
        var data = {};
        data[key] = value;
        if (recursive) data['recursive'] = true;
        obj.data = data;
        console.log('setProperty()', obj);
        return sendObj(obj);
    }