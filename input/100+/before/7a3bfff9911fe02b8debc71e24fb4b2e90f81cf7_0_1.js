function(store) {

        var temp = [];
        store.clearFilter();
        Ext.Array.each(store.getData().items, function(item, index, list) {
            temp.push(item.get('section_id'));
        });
        return temp;
    }