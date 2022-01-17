function(){
        var config = {
            store: new Ext.data.DirectStore({
                restful: true,
                autoLoad: false,
                autoSave: false,
                remoteSort: true,
                reader: new Ext.data.JsonReader({
                    root: 'data',
                    totalProperty: 'total',
                    fields: [
                        'id',
                        'bill',
                        'timestamp',
                        'sum',
                        'prev',
                        'maked',
                        'descr',
                        'inner_descr',
                        'rolled_by'
                    ]
                }),
                writer: new Ext.data.JsonWriter({
                    encode: false,
                    writeAllFields: true,
                    listful: true
                }),
                api: {
                    read: AbonApi.fees_get,
                    create: AbonApi.foo,
                    update: AbonApi.foo,
                    destroy: AbonApi.foo
                },
                baseParams : {
                    start:0,
                    limit:12,
                    foo:'bar',
                    uid:this.oid || 0,
                    filter_fields:['num'],
                    filter_value:''
                }
            }),
            pageSize: 12,
    		height: 380,       
            listeners: {
                afterrender : {
                    fn: function(obj) {
                        //obj.parent_form.children_forms.cards.obj=obj
                    },
                    scope: this
                }
            }
        }
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        Ext.ux.AbonCardsGrid.superclass.initComponent.apply(this, [config]);
    }