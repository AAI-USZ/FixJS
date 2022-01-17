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

		this.editing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit : 1
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
			flex : 0.3,
			editor : {
				xtype : 'DistributorComboBox',
				allowBlank : true
			}
		}, {
			header : i18n("Order Number"),
			dataIndex : 'orderNumber',
			flex : 0.2,
			editor : {
				xtype : 'textfield',
				allowBlank : true
			}
		}, {
			header : i18n("Packaging Unit"),
			dataIndex : 'packagingUnit',
			flex : 0.2,
			editor : {
				xtype : 'numberfield',
				allowDecimals : false,
				allowBlank : false,
				minValue : 1
			}
		}, {
			header : i18n("Price per Item"),
			dataIndex : 'price',
			flex : 0.2,
			renderer : function(val, p, rec) {
				return PartKeepr.getApplication().formatCurrency(val);
			},
			editor : {
				xtype : 'CurrencyField',
				allowBlank : false
			}
		}, {
			header : i18n("SKU"),
			dataIndex : 'sku',
			flex : 0.1,
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