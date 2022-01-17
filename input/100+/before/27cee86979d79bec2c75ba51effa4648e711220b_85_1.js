function() {							

		this._getBuilder_()	

		.addButton({name:"btnAsgnRoleToUsers",text:"Users", tooltip:"Assign users to the selected role",disabled:true

			,handler: this.onBtnAsgnRoleToUsers,scope:this,stateManager:{name:"selected_one_clean", dc:"rol" }	})	

							 	

		.addButton({name:"btnAsgnRoleToAccessCtrl",text:"Privileges", tooltip:"Assign privileges to the selected role",disabled:true

			,handler: this.onBtnAsgnRoleToAccessCtrl,scope:this,stateManager:{name:"selected_one_clean", dc:"rol" }	})	

							 	

		.addButton({name:"btnAsgnRoleToMenuItem",text:"Menu items", tooltip:"Assign menu items to the selected role",disabled:true

			,handler: this.onBtnAsgnRoleToMenuItem,scope:this,stateManager:{name:"selected_one_clean", dc:"rol" }	})	

							 	

		.addButton({name:"btnAsgnRoleToMenu",text:"Menus", tooltip:"Assign menus to the selected role",disabled:true

			,handler: this.onBtnAsgnRoleToMenu,scope:this,stateManager:{name:"selected_one_clean", dc:"rol" }	})	

							 	

		.addDcFilterFormView("rol",{ name:"rolFilter", xtype:"net.nan21.dnet.module.ad.usr.dc.Role$Filter",height:120})	 

		.addDcEditGridView("rol",{ name:"rolList", xtype:"net.nan21.dnet.module.ad.usr.dc.Role$EditList", frame:true,dockedItems:[{ xtype:"toolbar", ui:"footer", dock: 'bottom', weight:-1, items:[ this._elems_.get("btnAsgnRoleToUsers") ,this._elems_.get("btnAsgnRoleToAccessCtrl") ,this._elems_.get("btnAsgnRoleToMenu") ,this._elems_.get("btnAsgnRoleToMenuItem") ]}]})	 

		.addPanel({name: "main",layout:"card", activeItem:0})  	 

		.addPanel({name: "canvas1", layout:"border", defaults:{split:true},preventHeader:true})  	 

;	 	

	}