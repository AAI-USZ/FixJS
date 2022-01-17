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
                    // '<tpl if="this.isExpanded(values)">',
                    //     'hoge',
                    // '<tpl>',
                    '<div class="accordion-list-header">',
                        this.getHeaderItemTpl(),
                    '</div>',
                '</tpl>',
                {
                    isExpanded: function(values) {
                        return values.expanded;
                    }
                });

            list = Ext.create('Ext.dataview.DataView', {
                itemTpl: itemTpl
            });

            list.on('itemtap', this.onItemTap, this);

            this.setList(list);
            list.setScrollable(this.getListScrollable());
            this.add(list);
        }

        list.setStore(newStore);
    }