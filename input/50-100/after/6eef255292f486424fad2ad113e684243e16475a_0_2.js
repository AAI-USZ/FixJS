function(el) {
            el = Ext.get(el);
            Tiny.loadedTVs.remove(el);
            tinyMCE.execCommand('mceRemoveControl', false, el.dom.id);
        }