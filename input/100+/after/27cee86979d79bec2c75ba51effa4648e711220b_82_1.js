function() {							

		this._getBuilder_()	

		.addButton({name:"btnRunImportMap",text:"Import All", tooltip:"Import all files included in this set.",iconCls:"icon-action-import",disabled:true

			,handler: this.onBtnRunImportMap,scope:this,stateManager:{name:"record_is_clean", dc:"map" }	})	

							 	

		.addButton({name:"btnRunImportItem",text:"Import selected", tooltip:"Import the selected file (one at a time).",iconCls:"icon-action-import",disabled:true

			,handler: this.onBtnRunImportItem,scope:this,stateManager:{name:"selected_one", dc:"item" }	})	

							 	

		.addDcFilterFormView("map",{ name:"mapFilter", xtype:"net.nan21.dnet.module.ad.impex.dc.ImportMap$Filter",height:80})	 

		.addDcGridView("map",{ name:"mapList", xtype:"net.nan21.dnet.module.ad.impex.dc.ImportMap$List"})	 

		.addDcFormView("map",{ name:"mapEdit", xtype:"net.nan21.dnet.module.ad.impex.dc.ImportMap$Edit",height:140,dockedItems:[{ xtype:"toolbar", ui:"footer", dock: 'bottom', weight:-1, items:[ this._elems_.get("btnRunImportMap") ,this._elems_.get("btnRunImportItem") ]}]})	 

		.addDcEditGridView("item",{ name:"itemEditList", xtype:"net.nan21.dnet.module.ad.impex.dc.ImportMapItemCtx$CtxEditList", frame:true})	 

		.addPanel({name: "main",layout:"card", activeItem:0})  	 

		.addPanel({name: "canvas1", layout:"border", defaults:{split:true},preventHeader:true})  	 

		.addPanel({name: "canvas2", layout:"border", defaults:{split:true},preventHeader:true})  	 

;	 	

	}