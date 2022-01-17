function() {							

		this._getBuilder_()	

		.addButton({name:"btnRunImport",text:"Import All", tooltip:"Import all sets included in this job.",iconCls:"icon-action-import",disabled:true

			,handler: this.onBtnRunImport,scope:this,stateManager:{name:"record_status_is_edit", dc:"job" }	})	

							 	

		.addButton({name:"btnRunImportItem",text:"Import selected", tooltip:"Import the selected set (one at a time).",iconCls:"icon-action-import",disabled:true

			,handler: this.onBtnRunImportItem,scope:this,stateManager:{name:"selected_one", dc:"item" }	})	

							 	

		.addDcFilterFormView("job",{ name:"jobFilter", xtype:"net.nan21.dnet.module.ad.impex.dc.ImportJob$Filter",height:120})	 

		.addDcGridView("job",{ name:"jobList", xtype:"net.nan21.dnet.module.ad.impex.dc.ImportJob$List"})	 

		.addDcFormView("job",{ name:"jobEdit", xtype:"net.nan21.dnet.module.ad.impex.dc.ImportJob$Edit",height:140,dockedItems:[{ xtype:"toolbar", ui:"footer", dock: 'bottom', weight:-1, items:[ this._elems_.get("btnRunImport") ,this._elems_.get("btnRunImportItem") ]}]})	 

		.addDcEditGridView("item",{ name:"itemEditList", xtype:"net.nan21.dnet.module.ad.impex.dc.ImportJobItem$CtxEditList", frame:true})	 

		.addPanel({name: "main",layout:"card", activeItem:0})  	 

		.addPanel({name: "canvas1", layout:"border", defaults:{split:true},preventHeader:true})  	 

		.addPanel({name: "canvas2", layout:"border", defaults:{split:true},preventHeader:true})  	 

;	 	

	}