function() {							

		this._getBuilder_()	

		.addButton({name:"btnShowCanvas2",text:"Product prices", tooltip:"Product prices",disabled:true

			,handler: this.onShowCanvas2,scope:this,stateManager:{name:"selected_one_clean", dc:"version" }	})	

							 	

		.addButton({name:"btnAddProdByCateg",text:"Add from category ", tooltip:"Add products from product category",disabled:false

			,handler: this.onBtnAddProdByCateg,scope:this	})	

							 	

		.addButton({name:"btnAddProdByCategExec",text:"OK", tooltip:"Add products from the selected product category",disabled:false

			,handler: this.onBtnAddProdByCategExec,scope:this	})	

							 	

		.addDcFilterFormView("pricelist",{ name:"pricelistFilter", xtype:"net.nan21.dnet.module.md.mm.price.dc.PriceList$FilterH",height:80})	 

		.addDcEditGridView("pricelist",{ name:"pricelistEditList", xtype:"net.nan21.dnet.module.md.mm.price.dc.PriceList$EditList", frame:true})	 

		.addDcEditGridView("version",{ name:"versionEditList", xtype:"net.nan21.dnet.module.md.mm.price.dc.PriceListVersion$CtxEditList", frame:true,height:250,dockedItems:[{ xtype:"toolbar", ui:"footer", dock: 'bottom', weight:-1, items:[ this._elems_.get("btnShowCanvas2") ]}]})	 

		.addDcFormView("version",{ name:"versionView", xtype:"net.nan21.dnet.module.md.mm.price.dc.PriceListVersion$CtxView",height:120,dockedItems:[{ xtype:"toolbar", ui:"footer", dock: 'bottom', weight:-1, items:[ this._elems_.get("btnAddProdByCateg") ]}]})	 

		.addDcFormView("version",{ name:"versionCopyProdFromCateg", xtype:"net.nan21.dnet.module.md.mm.price.dc.PriceListVersion$CopyProductsFromCategory",height:120})	 

		.addDcFilterFormView("price",{ name:"priceFilter", xtype:"net.nan21.dnet.module.md.mm.price.dc.ProductPrice$FilterCtx",width:280,title:"Filter", collapsible:true})	 

		.addDcEditGridView("price",{ name:"priceEditList", xtype:"net.nan21.dnet.module.md.mm.price.dc.ProductPrice$EditList", frame:true})	 

		.addPanel({name: "main",layout:"card", activeItem:0})  	 

		.addPanel({name: "canvas1", layout:"border", defaults:{split:true},preventHeader:true})  	 

		.addPanel({name: "canvas2", layout:"border", defaults:{split:true},preventHeader:true})  	 

		.addPanel({name: "pricePanel", layout:"border", defaults:{split:true}})  	 

		

		.addWindow({name:"wdwVersionCopyProdFromCateg", closeAction:'hide', resizable:true, layout:"fit", items:[this._elems_.get("versionCopyProdFromCateg")]

,title:"Select product category",modal:true,width:400,height:120,buttons:{ xtype:"toolbar", weight:-1, items:[ this._elems_.get("btnAddProdByCategExec") ]}}) 	

;	 	

	}