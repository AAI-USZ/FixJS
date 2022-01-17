function(item, index, list) {
            if (object instanceof Ext.data.Store) {
                temp.push(item.get(property));
            } else {
                temp.push(item[property]);
            }
        }