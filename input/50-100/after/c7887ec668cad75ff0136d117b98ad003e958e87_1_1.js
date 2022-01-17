function (record) {
        Ext.getCmp('titletext').setTitle(record.get('resourceName'));
        if (record.get('resourceType')==='photo') {
            var located = 'resources/' + record.get('resourceLocation') + '.png'
            Ext.getCmp('resource_label').setHtml('<img src="'+located+'" height="100%" width="100%"/>')
        }
        Ext.getCmp('backButton').setHidden(false);
        Ext.getCmp('viewPort').setActiveItem(PAGES.RESOURCE_DET)
    }