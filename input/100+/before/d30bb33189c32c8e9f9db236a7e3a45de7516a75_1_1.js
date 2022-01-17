function(config) {
    config = config || {};
    this.config = config;
    this._loadStore();
    this._loadColumnModel();
	
    Ext.applyIf(config,{
        store: this.store
        ,cm: this.cm
        ,sm: new Ext.grid.RowSelectionModel({singleSelect:true})
        ,paging: (config.bbar ? true : false)
        ,loadMask: true
        ,autoHeight: true
        ,collapsible: true
        ,stripeRows: true
        ,header: false
        ,cls: 'modx-grid'
        ,preventRender: true
        ,preventSaveRefresh: true
        ,showPerPage: true
        ,stateful: false
        ,menuConfig: {
            defaultAlign: 'tl-b?'
            ,enableScrolling: false
        }
        ,viewConfig: {
            forceFit: true
            ,enableRowBody: true
            ,autoFill: true
            ,showPreview: true
            ,scrollOffset: 0
            ,emptyText: config.emptyText || _('ext_emptymsg')
        }
    });
    if (config.paging) {
        var pgItms = config.showPerPage ? ['-',_('per_page')+':',{
            xtype: 'textfield'
            ,value: config.pageSize || (parseInt(MODx.config.default_per_page) || 20)
            ,width: 40
            ,listeners: {
                'change': {fn:function(tf,nv,ov) {
                    if (Ext.isEmpty(nv)) return false;
                    nv = parseInt(nv);
                    this.getBottomToolbar().pageSize = nv;
                    this.store.load({params:{
                        start:0
                        ,limit: nv
                    }});
                },scope:this}
                ,'render': {fn: function(cmp) {
                    new Ext.KeyMap(cmp.getEl(), {
                        key: Ext.EventObject.ENTER
                        ,fn: this.blur
                        ,scope: cmp
                    });
                },scope:this}
            }
        }] : [];
        if (config.pagingItems) {
            for (var i=0;i<config.pagingItems.length;i++) {
                pgItms.push(config.pagingItems[i]);
            }
        }
        Ext.applyIf(config,{
            bbar: new Ext.PagingToolbar({
                pageSize: config.pageSize || (parseInt(MODx.config.default_per_page) || 20)
                ,store: this.getStore()
                ,displayInfo: true
                ,items: pgItms
            })
        });
    }
    if (config.grouping) {
        Ext.applyIf(config,{
          view: new Ext.grid.GroupingView({ 
            forceFit: true 
            ,scrollOffset: 0
            ,groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "'
                +(config.pluralText || _('records')) + '" : "'
                +(config.singleText || _('record'))+'"]})' 
          })
        });
    }
    if (config.tbar) {
        for (var i = 0;i<config.tbar.length;i++) {
            var itm = config.tbar[i];
            if (itm.handler && typeof(itm.handler) == 'object' && itm.handler.xtype) {
                itm.handler = this.loadWindow.createDelegate(this,[itm.handler],true);
            }
            if (!itm.scope) { itm.scope = this; }
        }
    }
    MODx.grid.Grid.superclass.constructor.call(this,config);
    this._loadMenu(config);
    this.addEvents('beforeRemoveRow','afterRemoveRow','afterAutoSave');
    if (!config.preventRender) { this.render(); }
	
    this.on('rowcontextmenu',this._showMenu,this);    
    if (config.autosave) {
        this.on('afteredit',this.saveRecord,this);
    }
	
    if (config.paging && config.grouping) {
        this.getBottomToolbar().bind(this.store);
    }

    this.getStore().load({
        params: {
            start: config.pageStart || 0
            ,limit: config.hasOwnProperty('pageSize') ? config.pageSize : (parseInt(MODx.config.default_per_page) || 20)
        }
    });
    this.getStore().on('exception',this.onStoreException,this);
    this.config = config;
}