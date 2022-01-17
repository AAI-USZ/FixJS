function(array, tpl) {
        var itemtpl = Ext.create('Ext.XTemplate', tpl);
        var items = [];
        Ext.Array.each(array, function(item) {
            items.push(itemtpl.apply(item));
        }, this);
        return '{' + items.join(', ') + '}';
    }