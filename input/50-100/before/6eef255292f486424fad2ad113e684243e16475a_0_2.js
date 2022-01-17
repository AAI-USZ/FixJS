function() {
        var els = Ext.query('.modx-richtext');
        var ed;
        Ext.each(els,function(el,i) {
            el = Ext.get(el);
            Tiny.loadedTVs.remove(el);
            tinyMCE.execCommand('mceRemoveControl', false, el.dom.id);
        },this);
    }