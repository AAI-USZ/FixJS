function (record) {
        Ext.getCmp('resource_title').setTitle(record.get('resourceName'));
        if (record.get('resourceType')==='photo') {
            var located = 'resources/' + record.get('resourceLocation') + '.png'
            Ext.getCmp('resource_label').setHtml('<img src="'+located+'" height="100%" width="100%"/>')
        }
        Ext.getCmp('viewPort').setActiveItem(PAGES.RESOURCE_DET)
    }