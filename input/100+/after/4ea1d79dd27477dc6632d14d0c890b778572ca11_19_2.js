function() {							

		this._getBuilder_()	

		.addDcFilterFormView("custGroup",{ name:"custGroupFilter", xtype:"net.nan21.dnet.module.md.bp.dc.CustomerGroup$Filter",height:80})	 

		.addDcEditGridView("custGroup",{ name:"custGroupEditList", xtype:"net.nan21.dnet.module.md.bp.dc.CustomerGroup$EditList", frame:true})	 

		.addDcEditGridView("custGroupAcct",{ name:"custGroupAcctEditList", xtype:"net.nan21.dnet.module.md.bp.dc.CustomerGroupAcct$CtxEditList", frame:true,height:220})	 

		.addDcFilterFormView("vendGroup",{ name:"vendGroupFilter", xtype:"net.nan21.dnet.module.md.bp.dc.VendorGroup$Filter",height:80})	 

		.addDcEditGridView("vendGroup",{ name:"vendGroupEditList", xtype:"net.nan21.dnet.module.md.bp.dc.VendorGroup$EditList", frame:true})	 

		.addDcEditGridView("vendGroupAcct",{ name:"vendGroupAcctEditList", xtype:"net.nan21.dnet.module.md.bp.dc.VendorGroupAcct$CtxEditList", frame:true,height:220})	 

		.addDcFilterFormView("legalForm",{ name:"legalFormFilter", xtype:"net.nan21.dnet.module.md.bp.dc.CompanyLegalForm$Filter",height:80})	 

		.addDcEditGridView("legalForm",{ name:"legalFormEditList", xtype:"net.nan21.dnet.module.md.bp.dc.CompanyLegalForm$EditList", frame:true})	 

		.addPanel({name: "main",layout:"card", activeItem:0})  	 

		.addPanel({name: "canvasCustGroup", layout:"border", defaults:{split:true},title:"Customer groups",preventHeader:true})  	 

		.addPanel({name: "canvasVendGroup", layout:"border", defaults:{split:true},title:"Vendor groups",preventHeader:true})  	 

		.addPanel({name: "canvasLegalForm", layout:"border", defaults:{split:true},title:"Company legal form",preventHeader:true})  	 

			

		.addPanel({name:"_main_with_toc_", layout:"border", id:Ext.id(), defaults:{split:true}, header:false,

				listeners:{ activate:{scope:this,fn:function(p){p.doLayout(false,true); this.fireEvent('canvaschange', p);     } }}

		})

		.addToc(["canvasLegalForm","canvasCustGroup","canvasVendGroup"]);

		this._mainViewName_  = "_main_with_toc_";	 	

	}