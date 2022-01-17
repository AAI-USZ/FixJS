function() {	

		this._getBuilder_()

		.addDc("csv", new net.nan21.dnet.module.ad.impex.dc.CsvExport({multiEdit:true}))

		.addDc("field", new net.nan21.dnet.module.ad.impex.dc.CsvExportField({multiEdit:true}))

		.addDc("sort", new net.nan21.dnet.module.ad.impex.dc.CsvExportSort({multiEdit:true}))		

		.linkDc("field", "csv",{fields:[ {childField:"csvExportId", parentField:"id"},{childField:"dataSource", parentField:"dataSource"} ]} )

		.linkDc("sort", "csv",{fields:[ {childField:"csvExportId", parentField:"id"},{childField:"dataSource", parentField:"dataSource"} ]} );		

	}