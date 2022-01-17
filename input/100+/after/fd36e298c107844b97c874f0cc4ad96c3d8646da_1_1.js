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
                        'num',
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
                    read: AbonApi.cards_get,
                    create: AbonApi.cards_set,
                    update: AbonApi.foo,
                    destroy: AbonApi.foo
                },
                baseParams : {
                    start:0,
                    limit:10,
                    uid:this.oid,
                    filter_fields:['num'],
                    filter_value:''
                }
            }),
            listeners: {
                afterrender: {
                    fn: function(obj) {
                        obj.parent_form.children_forms.cards.obj=obj
                    },
                    scope: this
                }
            },
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: {
                        fn: function(sm,index,record) {          
                            var store = Ext.ux.free_card_combo_store
							var tpstore = sm.grid.parent_form.children_forms.tariffs.obj.store
                            if (typeof(record.id)=='number') {								
                                tpstore.setBaseParam('card_id',record.id)
								tpstore.load()
                                store.load()
                            } else {
                                //this.store.load()
                            }
                        },
                        scope: this
                    }
                }
            }),
            columns: [
        		{header: "Id", dataIndex: 'id', width:40},
        		{header: "Num", dataIndex: 'num', width:80, editable: false,
            		renderer: function(value, metaData, record, rowIndex, colIndex, store) {
            			if (value===undefined) {
                    		this.editable=true
                		}
                		if (value<0) {
                    		return '<b>CaTV</b>';
                		} else {
                    		return value;
                		}
            		},
            		editor: new Ext.ux.FreeCardCombo(),
        		},
        		{header: "Active", dataIndex: 'active', width:40,
            		renderer: function(value, metaData, record, rowIndex, colIndex, store) {
            			if(record.data.num>0){
            				if (value==true) {
                    			return '<img src="/static/extjs/custom/tick_16.png" class="abon_card_deactivate" val="'+record.data.id+'">';
                			} else {
                    			return '<img src="/static/extjs/custom/block_16.png" class="abon_card_activate" val="'+record.data.id+'">';
                			}
                		} else {
                			if (value==true) {
                    			return '<img src="/static/extjs/custom/tick_16.png">';
                			} else {
                    			return '<img src="/static/extjs/custom/block_16.png">';
                			}
                		}
            		},
            		scope: this
        		},
        		{header: "Activated", dataIndex: 'activated', width:140, editable: true,
        			editor: new Ext.form.DateField({format:"Y-m-d"}),
        		},
        		{header: "", dataIndex: 'id', width:26,        		    
            		renderer: function(value, metaData, record, rowIndex, colIndex, store) {
            			if(record.data.num>0) {
                			return '<img src="/static/extjs/custom/delete_16.png"  class="abon_card_unbind" val="'+record.data.id+'">';
                	    } else {
                	    	return ""
                	    }
            		},
            		scope: this
        		},
    		],
    		abon_card_func: function(func,param) {
        	}
        }        
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        Ext.ux.AbonCardsGrid.superclass.initComponent.apply(this, [config]);
    }