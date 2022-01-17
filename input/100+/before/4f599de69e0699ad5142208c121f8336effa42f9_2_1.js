function(newStore, oldStore) {
        var list = this.getList(),
            itemTpl;

        if (!list) {
            itemTpl = new Ext.XTemplate(
                '<tpl if="leaf">',
                    '<div class="accordion-list-content">',
                        this.getContentItemTpl(),
                    '</div>',
                '<tpl else>',
                    '<div class="accordion-list-header">',
                        this.getHeaderItemTpl(),
                    '</div>',
                '</tpl>');

            list = Ext.create('Ext.DataView', {
                itemTpl: itemTpl
            });

            list.on('itemtap', this.onItemTap, this);

            this.setList(list);
            this.add(list);
        }

        list.setStore(newStore);
    }