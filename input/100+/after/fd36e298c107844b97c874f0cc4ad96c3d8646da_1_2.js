function(){
        var config = {
            store: new Ext.data.DirectStore({
                restful: true,
                autoLoad: false,
                autoSave: false,
                reader: new Ext.data.JsonReader({
                    root: 'data',
                    totalProperty: 'total',
                    fields: [
                        'id',
                        'tariff',
                        'active',
                        'activated',
                    ]
                }),
                writer: new Ext.data.JsonWriter({
                    encode: false,
                    writeAllFields: true,
                    listful: true
                }),
                api: {
                    read: AbonApi.cards_tp_get,
                    create: AbonApi.cards_tp_add,
                    update: AbonApi.cards_tp_update,
                    destroy: AbonApi.foo
                },
                baseParams : {
                    start:0,
                    limit:10,
                    uid:this.oid,
                    card_id:0,
                    filter_fields:['num'],
                    filter_value:''
                }
            }),
            listeners: {
                afterrender : {
                    fn: function(obj) {
                        obj.parent_form.children_forms.tariffs.obj=obj
                    },
                    scope: this
                }
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: {
                        fn: function(sm,index,record) {
                        	var tpstore = Ext.ux.card_tp_combo_store
                        	tpstore.load()
                            //sm.grid.parent_form.children_forms.tariffs.obj.setTitle('13')
                        },
                    scope: this
                    }
                }
            }),
            columns: [
        		{header: "Id", dataIndex: 'id', width:40},
        		{header: "Tariff", dataIndex: 'tariff', width:120,
        			editor: new Ext.ux.CardTpCombo(),
        		},
        		{header: "Active", dataIndex: 'active', width:40,
            		renderer: function(value, metaData, record, rowIndex, colIndex, store) {
            			if (value==true) {
                    		return '<img src="/static/extjs/custom/tick_16.png" class="abon_tp_deactivate" val="'+record.data.id+'">';
                		} else {
                    		return '<img src="/static/extjs/custom/block_16.png" class="abon_tp_activate" val="'+record.data.id+'">';
                		}
            		}
        		},        		
        		{header: "Activated", dataIndex: 'activated', width:140, editable: true, 
        			editor: new Ext.form.DateField({format:"Y-m-d"}),
        		},
        		{header: "", dataIndex: 'id', width:26,
            		renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                		return '<img src="/static/extjs/custom/delete_16.png" class="abon_tp_unbind" val="'+record.data.id+'">';
            		}
        		},
    		]
        }
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        Ext.ux.AbonCardsGrid.superclass.initComponent.apply(this, [config]);
    }