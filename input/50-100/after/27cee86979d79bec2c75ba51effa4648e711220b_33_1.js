function () {	

		this._getBuilder_()	

		.addTextColumn({ name:"name", dataIndex:"name",width:120 })   	

		.addTextColumn({ name:"description", dataIndex:"description", width:300 })   	

		.addTextColumn({ name:"path", dataIndex:"path", width:120 })   	

		.addBooleanColumn({ name:"active", dataIndex:"active"})   	     

	  	.addDefaults()

	  ;		   

	}