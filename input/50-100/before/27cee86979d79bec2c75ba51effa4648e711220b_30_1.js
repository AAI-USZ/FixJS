function () {	

		this._getBuilder_()	

		.addTextColumn({ name:"name", dataIndex:"name",width:120 })   	

		.addTextColumn({ name:"description", dataIndex:"description", width:300 })   	

		.addBooleanColumn({ name:"active", dataIndex:"active"})   	     

	  	.addDefaults()

	  ;		   

	}