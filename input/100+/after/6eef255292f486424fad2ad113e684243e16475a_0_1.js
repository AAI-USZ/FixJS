function(el) {
            el = Ext.get(el);
            if (!el) {return;}
            if (Ext.isEmpty(Tiny.loadedTVs)) {Tiny.loadedTVs = [];}
            if (Tiny.loadedTVs.indexOf(el) != -1) {return;}

            tinyMCE.execCommand('mceAddControl', false, el.dom.id);
            ed = tinyMCE.get(el.dom.id);
            if (ed) {
                ed.execCommand('mceResize',false,'60%');
            }
            Tiny.loadedTVs.push(el);
        }