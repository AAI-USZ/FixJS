function() {	

		this._getBuilder_()

		.addDc("asset", new net.nan21.dnet.module.fi.asset.dc.Asset({}))

		.addDc("amort", new net.nan21.dnet.module.fi.asset.dc.Amortization({multiEdit:true}))

		.addDc("acct", new net.nan21.dnet.module.fi.asset.dc.AssetAcct({multiEdit:true}))		

		.linkDc("amort", "asset",{fields:[ {childField:"assetId", parentField:"id"} ]} )

		.linkDc("acct", "asset",{fields:[ {childField:"assetId", parentField:"id"} ]} );		

	}