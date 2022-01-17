function(object, property) {

        var items, temp = [];
        if (object instanceof Ext.data.Store) {
            object.clearFilter();
            items = object.getData().items;
        } else if (object instanceof Array) {
            items = object;
        } else {
            return null;
        }

        Ext.Array.each(items, function(item, index, list) {
            if (object instanceof Ext.data.Store) {
                temp.push(item.get(property));
            } else {
                temp.push(item[property]);
            }
        });
        return temp;
    }