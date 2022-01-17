function() {							

		this._getBuilder_()	

		.addButton({name:"btnAsgnRoleToAccessCtrl",text:"Roles", tooltip:"Assign selected privilege to roles",disabled:true

			,handler: this.onBtnAsgnRoleToAccessCtrl,scope:this,stateManager:{name:"selected_one_clean", dc:"ctrl" }	})	

							 	

		.addButton({name:"btnShowUiAsgnRules",text:"ASGN rules", tooltip:"Open assignment rules frame",disabled:false

			,handler: this.onBtnShowUiAsgnRules,scope:this	})	

							 	

		.addButton({name:"btnShowUiDsRules",text:"DS rules", tooltip:"Open data-source rules frame",disabled:false

			,handler: this.onBtnShowUiDsRules,scope:this	})	

							 	

		.addButton({name:"btnCopyRules",text:"Copy rules", tooltip:"Copy rules from another privilege",disabled:true

			,handler: this.onBtnCopyRules,scope:this,stateManager:{name:"selected_one_clean", dc:"ctrl" }	})	

							 	

		.addButton({name:"btnCopyRulesExec",text:"OK", tooltip:"Copy rules from selected privilege",disabled:false

			,handler: this.onBtnCopyRulesExec,scope:this	})	

							 	

		.addDcFilterFormView("ctrl",{ name:"privilegeFilter", xtype:"net.nan21.dnet.module.ad.usr.dc.AccessControl$Filter",height:80})	 

		.addDcEditGridView("ctrl",{ name:"privilegeEditList", xtype:"net.nan21.dnet.module.ad.usr.dc.AccessControl$EditList", frame:true,dockedItems:[{ xtype:"toolbar", ui:"footer", dock: 'right', weight:-1, items:[ this._elems_.get("btnAsgnRoleToAccessCtrl") ,this._elems_.get("btnCopyRules") ,this._elems_.get("btnShowUiDsRules") ,this._elems_.get("btnShowUiAsgnRules") ]}]})	 

		.addDcFormView("ctrl",{ name:"privilegeCopyRules", xtype:"net.nan21.dnet.module.ad.usr.dc.AccessControl$CopyRulesFromSource"})	 

		.addDcEditGridView("dsAccess",{ name:"dsAccessCtxEditList", xtype:"net.nan21.dnet.module.ad.usr.dc.DsAccessControl$CtxEditList", frame:true,title:"Data-source"})	 

		.addDcEditGridView("asgnAccess",{ name:"asgnAccessCtxEditList", xtype:"net.nan21.dnet.module.ad.usr.dc.AsgnAccessControl$CtxEditList", frame:true,title:"Assignment"})	 

		.addDcEditGridView("dsMtdAccess",{ name:"dsMtdAccessCtxEditList", xtype:"net.nan21.dnet.module.ad.usr.dc.DsMethodAccessControl$CtxEditList", frame:true,title:"Methods"})	 

		.addPanel({name: "main",layout:"card", activeItem:0})  	 



		.addPanel({name: "detailTabs", xtype:"tabpanel", activeTab:0, plain:false, deferredRender:false, id:Ext.id(),height:250}) 	 

		.addPanel({name: "canvas1", layout:"border", defaults:{split:true},preventHeader:true})  	 

		

		.addWindow({name:"wdwCopyRules", closeAction:'hide', resizable:true, layout:"fit", items:[this._elems_.get("privilegeCopyRules")]

,title:"Select source",modal:true,width:400,height:180,buttons:{ xtype:"toolbar", weight:-1, items:[ this._elems_.get("btnCopyRulesExec") ]}}) 	

;	 	

	}