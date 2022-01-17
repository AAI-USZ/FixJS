function() {							

		this._getBuilder_()	

		.addButton({name:"btnRunExportMap",text:"Export All", tooltip:"Export all items included in this set.",iconCls:"icon-action-export",disabled:true

			,handler: this.onBtnRunExportMap,scope:this,stateManager:{name:"record_is_clean", dc:"map" }	})	

							 	

		.addButton({name:"btnRunExportItem",text:"Export selected", tooltip:"Export the selected item (one at a time).",iconCls:"icon-action-export",disabled:true

			,handler: this.onBtnRunExportItem,scope:this,stateManager:{name:"selected_one", dc:"item" }	})	

							 	

		.addDcFilterFormView("map",{ name:"mapFilter", xtype:"net.nan21.dnet.module.ad.impex.dc.ExportMap$Filter",height:120})	 

		.addDcGridView("map",{ name:"mapList", xtype:"net.nan21.dnet.module.ad.impex.dc.ExportMap$List"})	 

		.addDcFormView("map",{ name:"mapEdit", xtype:"net.nan21.dnet.module.ad.impex.dc.ExportMap$Edit",height:120,dockedItems:[{ xtype:"toolbar", ui:"footer", dock: 'bottom', weight:-1, items:[ this._elems_.get("btnRunExportMap") ,this._elems_.get("btnRunExportItem") ]}]})	 

		.addDcFilterFormView("item",{ name:"itemFilter", xtype:"net.nan21.dnet.module.ad.impex.dc.ExportMapItem$Filter"})	 

		.addDcEditGridView("item",{ name:"itemCtxEditList", xtype:"net.nan21.dnet.module.ad.impex.dc.ExportMapItem$CtxEditList", frame:true})	 

		.addPanel({name: "main",layout:"card", activeItem:0})  	 

		.addPanel({name: "canvas1", layout:"border", defaults:{split:true},preventHeader:true})  	 

		.addPanel({name: "canvas2", layout:"border", defaults:{split:true},preventHeader:true})  	 

;	 	

	}