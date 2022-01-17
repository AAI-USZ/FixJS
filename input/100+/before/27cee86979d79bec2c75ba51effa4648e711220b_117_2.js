function () {	

		this._getBuilder_()	

		.addTextColumn({ name:"name", dataIndex:"name",width:200 })   	

		.addTextColumn({ name:"code", dataIndex:"code",width:100 })   	

		.addTextColumn({ name:"iso", dataIndex:"iso",width:100 })   	

		.addNumberColumn({ name:"countryId", dataIndex:"countryId", hidden:true,format:"0",width:70 })  

		.addTextColumn({ name:"countryCode", dataIndex:"countryCode",width:100 })   	

		.addBooleanColumn({ name:"active", dataIndex:"active"})   	     

		.addTextColumn({ name:"notes", dataIndex:"notes",width:200 })   	

	  	.addDefaults()

	  ;		   

	}