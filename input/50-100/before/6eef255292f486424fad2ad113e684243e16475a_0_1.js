function(ed) {
        var el = Ext.get(ed.id+'_ifr');
        new MODx.load({
            xtype: 'modx-treedrop'
            ,target: el
            ,targetEl: el.dom
            ,iframe: true
            ,iframeEl: 'tinymce'
            ,onInsert: function(v) {
                tinyMCE.execCommand('mceInsertContent',false,v);
            }
        });
    }