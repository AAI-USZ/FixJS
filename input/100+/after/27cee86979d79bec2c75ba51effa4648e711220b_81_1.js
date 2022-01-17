function() {							

		this._getBuilder_()	

		.addButton({name:"btnRunImport",text:"Import selected", tooltip:"Import the selected file (one at a time).",iconCls:"icon-action-import",disabled:true

			,handler: this.onBtnRunImport,scope:this,stateManager:{name:"selected_one_clean", dc:"mapItem" }	})	

							 	

		.addButton({name:"btnImportFileShow",text:"Import ad-hoc", tooltip:"Specify a file on server to import",disabled:false

			,handler: this.onBtnImportFileShow,scope:this	})	

							 	

		.addButton({name:"btnImportFileRun",text:"Execute", tooltip:"Execute",disabled:false

			,handler: this.onBtnImportFileRun,scope:this	})	

							 	

		.addDcFilterFormView("mapItem",{ name:"mapItemFilter", xtype:"net.nan21.dnet.module.ad.impex.dc.ImportMapItem$Filter",height:80})	 

		.addDcEditGridView("mapItem",{ name:"mapItemEditList", xtype:"net.nan21.dnet.module.ad.impex.dc.ImportMapItem$EditList", frame:true,dockedItems:[{ xtype:"toolbar", ui:"footer", dock: 'bottom', weight:-1, items:[ this._elems_.get("btnRunImport") ,this._elems_.get("btnImportFileShow") ]}]})	 

		.addDcFilterFormView("mapItem",{ name:"importFileForm", xtype:"net.nan21.dnet.module.ad.impex.dc.ImportMapItem$ImportFileForm"})	 

		.addPanel({name: "main",layout:"card", activeItem:0})  	 

		.addPanel({name: "canvas1", layout:"border", defaults:{split:true},preventHeader:true})  	 

		

		.addWindow({name:"wdwImportFile", closeAction:'hide', resizable:true, layout:"fit", items:[this._elems_.get("importFileForm")]

,title:"Import file from server",modal:true,width:500,height:170,buttons:{ xtype:"toolbar", weight:-1, items:[ this._elems_.get("btnImportFileRun") ]}}) 	

;	 	

	}