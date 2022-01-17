function () {

		this._getBuilder_()

		.addTextColumn({ name:"exportMap", dataIndex:"exportMap", hidden:true,width:120 })

		.addNumberColumn({ name:"sequenceNo", dataIndex:"sequenceNo", align:"right",editor:{xtype:"numberfield", selectOnFocus:true , decimalPrecision:2 } })

		.addLov({name:"csvExport", xtype:"gridcolumn", dataIndex:"csvExport",width:120,editor:{xtype:"net.nan21.dnet.module.ad.impex.lovs.CsvExports" , selectOnFocus:true ,maxLength:255,retFieldMapping: [{lovField:"id", dsField: "csvExportId"} ]} })

		.addTextColumn({ name:"fileName", dataIndex:"fileName", width:300,editor:{xtype:"textfield", selectOnFocus:true } })

		.addBooleanColumn({ name:"active", dataIndex:"active"})

		.addNumberColumn({ name:"csvExportId", dataIndex:"csvExportId", hidden:true, align:"right",format:"0",width:70})

	  	.addDefaults()

	  ;  		   

	}