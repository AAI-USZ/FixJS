function(ed,el,cmd,ui,v) {
        var pr = Ext.getCmp('modx-panel-resource');
        if (pr) { pr.markDirty(); }
        return false;
    }