function() {
        if (Tiny.contentBelowAdded) return false;
        var below = Ext.get('modx-content-below');
        if (!below) return false;
        below.createChild({
            tag: 'div'
            ,id: 'tiny-content-below'
            ,style: 'margin-top: 5px;'
        });
        var tb = Ext.get('tiny-content-below');
        tb.createChild({
            tag: 'label'
            ,id: 'tiny-toggle-label'
        });
        var tbl = Ext.get('tiny-toggle-label');
        tbl.createChild({
            html: Tiny.lang.toggle_editor
            ,style: 'float: left; margin-right: 5px;'
        });
        var z = Ext.state.Manager.get(MODx.siteId+'-tiny');
        var chk = z === false || z === 'false' ? false : true;
        tbl.createChild({
            tag: 'input'
            ,type: 'checkbox'
            ,id: 'tiny-toggle-rte'
            ,name: 'tiny_toggle'
            ,value: 1
            ,checked: chk
        });
        var cb = Ext.get('tiny-toggle-rte');
        cb.dom.checked = chk;
        cb.on('click',function(a,b) {
            var cb = Ext.get(b);
            var id = 'ta';
            if (cb.dom.checked) {
                tinyMCE.execCommand('mceAddControl',false,id);
                Ext.state.Manager.set(MODx.siteId+'-tiny',true);
            } else {
                tinyMCE.execCommand('mceRemoveControl',false,id);
                Ext.state.Manager.set(MODx.siteId+'-tiny',false);
            }
        },this);
        Tiny.contentBelowAdded = true;
        return true;
    }