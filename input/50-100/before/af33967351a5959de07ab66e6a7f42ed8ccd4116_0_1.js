function(p) {
        var v = {};
        Ext.apply(v,this.store.baseParams);
        Ext.apply(v,p);
        this.pagingBar.changePage(1);
        this.store.baseParams = v;
        this.store.load();
    }