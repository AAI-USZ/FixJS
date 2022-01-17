function (record) {
        Ext.getCmp('resource_title').setTitle(record.get('resourceName'));
        Ext.getCmp('resource_label').setHtml('<img src="resources/'+record.get('resourceLocation')+'.png" height="100%" width="100%"/>')
        Ext.getCmp('viewPort').setActiveItem(PAGES.RESOURCE_DET)
    }