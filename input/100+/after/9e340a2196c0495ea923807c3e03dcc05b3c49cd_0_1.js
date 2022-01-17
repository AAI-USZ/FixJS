function() {
		this.store = Ext.create("Ext.data.Store", {
			model : 'PartKeepr.PartDistributor',
			proxy : {
				type : 'memory',
				reader : {
					type : 'json'
				}
			}

		});

		this.editing = Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit : 1,
			listeners: {
				beforeedit: function (editor, e, eOpts) {
					if (e.field == "packagePrice") {
						e.record.set("packagePrice", e.record.get("price") * e.record.get("packagingUnit"));
					}
				},
				edit: function (editor, e, eOpts) {
					if (e.field == "packagePrice" && e.record.get("packagingUnit")) {
						e.record.set("price", e.value / e.record.get("packagingUnit"));
					}
				},
				scope: this
			}
		});

		this.plugins = [ this.editing ];

		this.deleteButton = Ext.create("Ext.button.Button", {
			text : 'Delete',
			disabled : true,
			itemId : 'delete',
			scope : this,
			icon : 'resources/silkicons/lorry_delete.png',
			handler : this.onDeleteClick
		});

		this.dockedItems = [ {
			xtype : 'toolbar',
			items : [ {
				text : 'Add',
				scope : this,
				icon : 'resources/silkicons/lorry_add.png',
				handler : this.onAddClick
			}, this.deleteButton ]
		} ];

		this.columns = [ {
			header : i18n("Distributor"),
			dataIndex : 'distributor_id',
			xtype : 'templatecolumn',
			tpl : '{distributor_name}',
			flex : 1,
			editor : {
				xtype : 'DistributorComboBox',
				allowBlank : true
			}
		}, {
			header : i18n("Order Number"),
			dataIndex : 'orderNumber',
			flex : 1,
			editor : {
				xtype : 'textfield',
				allowBlank : true
			}
		}, {
			header : i18n("Packaging Unit"),
			dataIndex : 'packagingUnit',
			flex : 1,
			editor : {
				xtype : 'numberfield',
				allowDecimals : false,
				allowBlank : false,
				minValue : 1
			}
		}, {
			header : i18n("Price per Item"),
			dataIndex : 'price',
			flex : 1,
			renderer : function(val, p, rec) {
				return PartKeepr.getApplication().formatCurrency(val);
			},
			editor : {
				xtype : 'CurrencyField',
				allowBlank : false
			}
		}, {
			header: i18n("Package Price"),
			flex: 1,
			dataIndex: 'packagePrice',
			renderer : function(val, p, rec) {
				return PartKeepr.getApplication().formatCurrency(rec.get("price") * rec.get("packagingUnit"));
			},
			editor : {
				xtype : 'CurrencyField',
				allowBlank : true
			}
		},{
			header : i18n("SKU"),
			dataIndex : 'sku',
			flex : 1,
			editor : {
				xtype : 'textfield',
				allowBlank : true
			}
		} ];

		this.callParent();

		this.getSelectionModel().on('selectionchange',
									this.onSelectChange,
									this);
		this.on("edit", this.onEdit, this);
	}