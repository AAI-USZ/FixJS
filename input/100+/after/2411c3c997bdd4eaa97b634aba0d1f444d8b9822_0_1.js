function (record) {
        Ext.getCmp('title_res_det').setTitle(record.get('resourceName'));
        var l = 'resources/' + record.get('resourceLocation');
        var c = Ext.getCmp('resource_label')
        if (record.get('resourceType')==='photo') {
            //Ext.getCmp('resource_label').setHtml('<img src="'+ l +'" height="100%" width="100%"/>')
            var cell = Ext.create('Ext.Img', {
                src: l,
                height: '100%',
                width: '100%'
            })
        } else if (record.get('resourceType')==='video') {
            // Ext.getCmp('resource_label').setHtml('<video controls="controls"><source src="' + l + '"/></video>')
            var cell = Ext.create('Ext.Video', {
                url: l,
                width: '100%',
                height: '100%'
            })
        } else if (record.get('resourceType')==='audio') {
            // Ext.getCmp('resource_label').setHtml('<audio controls="controls"><source src="' + l + '" type = "audio/mpeg"/>Your browser does not support the audio element</audio>')
            var cell = Ext.create('Ext.Audio', {
                url: l,
                width: '100%'
            })
        }
        c.add(cell)
        Ext.getCmp('viewPort').setActiveItem(PAGES.RESOURCE_DET.value)
    }