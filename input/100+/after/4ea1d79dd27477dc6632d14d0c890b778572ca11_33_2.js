function() {							

		this._getBuilder_()	

		.addButton({name:"btnViewAttachment",text:"View", tooltip:"View the selected attachment",iconCls:"icon-action-view",disabled:true

			,handler: this.onBtnViewAttachment,scope:this,stateManager:{name:"selected_one", dc:"atch" }	})	

							 	

		.addButton({name:"btnUploadAttachment",text:"Upload...", tooltip:"Upload attachment file.",disabled:true

			,handler: this.onBtnUploadAttachment,scope:this,stateManager:{name:"selected_one_clean", dc:"atch" }	})	

							 	

		.addButton({name:"btnConfirmOrder",text:"Confirm", tooltip:"Confirm order.",iconCls:"icon-action-commit",disabled:true

			,handler: this.onBtnConfirmOrder,scope:this,stateManager:{name:"selected_one_clean", dc:"order" , and: function(dc) {return (dc.record && !dc.record.get("confirmed"));}}	})	

							 	

		.addButton({name:"btnUnConfirmOrder",text:"Un-Confirm", tooltip:"Un-Confirm order.",iconCls:"icon-action-rollback",disabled:true

			,handler: this.onBtnUnConfirmOrder,scope:this,stateManager:{name:"selected_one_clean", dc:"order" , and: function(dc) {return (dc.record && dc.record.get("confirmed") && !dc.record.get("invoiced") && !dc.record.get("delivered") );}}	})	

							 	

		.addButton({name:"btnCreateInvoice",text:"Generate Invoice", tooltip:"Generate Invoice",disabled:true

			,handler: this.onBtnCreateInvoice,scope:this,stateManager:{name:"selected_one_clean", dc:"order" , and: function(dc) {return (dc.record && dc.record.get("confirmed") && ! dc.record.get("invoiced"));}}	})	

							 	

		.addButton({name:"btnCreateDelivery",text:"Generate Delivery", tooltip:"Generate Delivery",disabled:true

			,handler: this.onBtnCreateDelivery,scope:this,stateManager:{name:"selected_one_clean", dc:"order" , and: function(dc) {return ( dc.record && dc.record.get("confirmed") && ! dc.record.get("delivered"));}}	})	

							 	

		.addButton({name:"btnCreateDeliveryOk",text:"OK", tooltip:"Generate Delivery",disabled:false

			,handler: this.onBtnCreateDeliveryOk,scope:this	})	

							 	

		.addButton({name:"btnCreateInvoiceOk",text:"OK", tooltip:"Generate Invoice",disabled:false

			,handler: this.onBtnCreateInvoiceOk,scope:this	})	

							 	

		.addButton({name:"btnShowInvoice",text:"Show Invoice", tooltip:"Show the invoice linked to this sales order",disabled:true

			,handler: this.onBtnShowInvoice,scope:this,stateManager:{name:"selected_one", dc:"order" , and: function(dc) {return (dc.record && dc.record.get("invoiced"));}}	})	

							 	

		.addButton({name:"btnShowDelivery",text:"Show delivery", tooltip:"Show the delivery note linked to this sales order",disabled:true

			,handler: this.onBtnShowDelivery,scope:this,stateManager:{name:"selected_one", dc:"order" , and: function(dc) {return (dc.record && dc.record.get("delivered"));}}	})	

							 	

		.addDcFilterFormView("order",{ name:"orderFilter", xtype:"net.nan21.dnet.module.sd.order.dc.SalesOrder$Filter",height:180})	 

		.addDcGridView("order",{ name:"orderList", xtype:"net.nan21.dnet.module.sd.order.dc.SalesOrder$List"})	 

		.addDcFormView("order",{ name:"orderEditMain", xtype:"net.nan21.dnet.module.sd.order.dc.SalesOrder$EditMain",height:200,dockedItems:[{ xtype:"toolbar", ui:"footer", dock: 'bottom', weight:-1, items:[ this._elems_.get("btnConfirmOrder") ,this._elems_.get("btnUnConfirmOrder") ,this._elems_.get("btnCreateInvoice") ,this._elems_.get("btnShowInvoice") ,this._elems_.get("btnCreateDelivery") ,this._elems_.get("btnShowDelivery") ]}]})	 

		.addDcGridView("tax",{ name:"taxList", xtype:"net.nan21.dnet.module.sd.order.dc.SalesOrderTax$List",title:"Taxes"})	 

		.addDcFormView("order",{ name:"orderGenDelivery", xtype:"net.nan21.dnet.module.sd.order.dc.SalesOrder$FrmGenDelivery"})	 

		.addDcFormView("order",{ name:"orderGenInvoice", xtype:"net.nan21.dnet.module.sd.order.dc.SalesOrder$FrmGenInvoice"})	 

		.addDcFormView("order",{ name:"orderEditDetails", xtype:"net.nan21.dnet.module.sd.order.dc.SalesOrder$EditDetails",title:"Details"})	 

		.addDcGridView("item",{ name:"itemList", xtype:"net.nan21.dnet.module.sd.order.dc.SalesOrderItem$CtxList"})	 

		.addDcFormView("item",{ name:"itemEdit", xtype:"net.nan21.dnet.module.sd.order.dc.SalesOrderItem$EditForm"})	 

		.addDcGridView("itemTax",{ name:"itemTaxList", xtype:"net.nan21.dnet.module.sd.order.dc.SalesOrderItemTax$CtxList",width:400,title:"Item taxes", collapsible:true})	 

		.addDcGridView("note",{ name:"noteList", xtype:"net.nan21.dnet.module.ad.data.dc.Note$List",width:300})	 

		.addDcFormView("note",{ name:"noteEdit", xtype:"net.nan21.dnet.module.ad.data.dc.Note$Edit"})	 

		.addDcEditGridView("atch",{ name:"atchEditList", xtype:"net.nan21.dnet.module.ad.data.dc.Attachment$CtxEditList", frame:true,title:"Attachments",dockedItems:[{ xtype:"toolbar", ui:"footer", dock: 'bottom', weight:-1, items:[ this._elems_.get("btnViewAttachment") ,this._elems_.get("btnUploadAttachment") ]}]})	 

		.addPanel({name: "main",layout:"card", activeItem:0})  	 

		.addPanel({name: "itemsPanel",layout:"card", activeItem:0})  	 



		.addPanel({name: "orderDetailsTab", xtype:"tabpanel", activeTab:0, plain:false, deferredRender:false, id:Ext.id()}) 	 

		.addPanel({name: "canvas1", layout:"border", defaults:{split:true},preventHeader:true})  	 

		.addPanel({name: "canvas2", layout:"border", defaults:{split:true},preventHeader:true})  	 

		.addPanel({name: "notesPanel", layout:"border", defaults:{split:true},title:"Notes"})  	 

		.addPanel({name: "linesPanel", layout:"border", defaults:{split:true},title:"Items"})  	 

		

		.addWindow({name:"wdwGenDelivery", closeAction:'hide', resizable:true, layout:"fit", items:[this._elems_.get("orderGenDelivery")]

,title:"Generate delivery",modal:true,width:400,height:180,buttons:{ xtype:"toolbar", weight:-1, items:[ this._elems_.get("btnCreateDeliveryOk") ]}}) 	



		.addWindow({name:"wdwGenInvoice", closeAction:'hide', resizable:true, layout:"fit", items:[this._elems_.get("orderGenInvoice")]

,title:"Generate invoice",modal:true,width:400,height:120,buttons:{ xtype:"toolbar", weight:-1, items:[ this._elems_.get("btnCreateInvoiceOk") ]}}) 	

;	 	

	}