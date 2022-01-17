function() {	

		this._getBuilder_()

		.addDc("asset", new net.nan21.dnet.module.fi.asset.dc.Asset({}))

		.addDc("amort", new net.nan21.dnet.module.fi.asset.dc.AmortizationItem({multiEdit:true}))		

		.linkDc("amort", "asset",{fields:[ {childField:"assetId", parentField:"id"} ]} );		

	}