function() {							

		this._getBuilder_()	

		.addDcFilterFormView("payMtd",{ name:"payMtdFilter", xtype:"net.nan21.dnet.module.md.base.tx.dc.PaymentMethod$Filter",height:90})	 

		.addDcEditGridView("payMtd",{ name:"payMtdEditList", xtype:"net.nan21.dnet.module.md.base.tx.dc.PaymentMethod$EditList", frame:true})	 

		.addDcFilterFormView("payTerm",{ name:"payTermFilter", xtype:"net.nan21.dnet.module.md.base.tx.dc.PaymentTerm$Filter",height:90})	 

		.addDcEditGridView("payTerm",{ name:"payTermEditList", xtype:"net.nan21.dnet.module.md.base.tx.dc.PaymentTerm$EditList", frame:true})	 

		.addDcFilterFormView("delivMtd",{ name:"delivMtdFilter", xtype:"net.nan21.dnet.module.md.base.tx.dc.DeliveryMethod$Filter",height:90})	 

		.addDcEditGridView("delivMtd",{ name:"delivMtdEditList", xtype:"net.nan21.dnet.module.md.base.tx.dc.DeliveryMethod$EditList", frame:true})	 

		.addPanel({name: "main",layout:"card", activeItem:0})  	 

		.addPanel({name: "canvasPayMtd", layout:"border", defaults:{split:true},title:"Payment methods",preventHeader:true})  	 

		.addPanel({name: "canvasPayTerm", layout:"border", defaults:{split:true},title:"Payment terms",preventHeader:true})  	 

		.addPanel({name: "canvasDelivMtd", layout:"border", defaults:{split:true},title:"Delivery methods",preventHeader:true})  	 

			

		.addPanel({name:"_main_with_toc_", layout:"border", id:Ext.id(), defaults:{split:true}, header:false,

				listeners:{ activate:{scope:this,fn:function(p){p.doLayout(false,true); this.fireEvent('canvaschange', p);     } }}

		})

		.addToc(["canvasPayMtd","canvasPayTerm","canvasDelivMtd"]);

		this._mainViewName_  = "_main_with_toc_";	 	

	}