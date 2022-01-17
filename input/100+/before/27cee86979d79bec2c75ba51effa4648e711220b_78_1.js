function() {							

		this._getBuilder_()	

		.addButton({name:"btnRunExport",text:"Export All", tooltip:"Export all sets included in this job.",iconCls:"icon-action-export",disabled:true

			,handler: this.onBtnRunExport,scope:this,stateManager:{name:"record_status_is_edit", dc:"job" }	})	

							 	

		.addButton({name:"btnRunExportItem",text:"Export selected", tooltip:"Export the selected set (one at a time).",iconCls:"icon-action-export",disabled:true

			,handler: this.onBtnRunExportItem,scope:this,stateManager:{name:"selected_one", dc:"item" }	})	

							 	

		.addDcFilterFormView("job",{ name:"jobFilter", xtype:"net.nan21.dnet.module.ad.impex.dc.ExportJob$Filter",height:120})	 

		.addDcGridView("job",{ name:"jobList", xtype:"net.nan21.dnet.module.ad.impex.dc.ExportJob$List"})	 

		.addDcFormView("job",{ name:"jobEdit", xtype:"net.nan21.dnet.module.ad.impex.dc.ExportJob$Edit",height:140,dockedItems:[{ xtype:"toolbar", ui:"footer", dock: 'bottom', weight:-1, items:[ this._elems_.get("btnRunExport") ,this._elems_.get("btnRunExportItem") ]}]})	 

		.addDcEditGridView("item",{ name:"itemEditList", xtype:"net.nan21.dnet.module.ad.impex.dc.ExportJobItem$CtxEditList", frame:true})	 

		.addPanel({name: "main",layout:"card", activeItem:0})  	 

		.addPanel({name: "canvas1", layout:"border", defaults:{split:true},preventHeader:true})  	 

		.addPanel({name: "canvas2", layout:"border", defaults:{split:true},preventHeader:true})  	 

;	 	

	}