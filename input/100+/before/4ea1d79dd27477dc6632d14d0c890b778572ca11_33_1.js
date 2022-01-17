function() {	

		this._getBuilder_()

		.addDc("order", new net.nan21.dnet.module.sd.order.dc.SalesOrder({}))

		.addDc("item", new net.nan21.dnet.module.sd.order.dc.SalesOrderItem({}))

		.addDc("itemTax", new net.nan21.dnet.module.sd.order.dc.SalesOrderItemTax({}))

		.addDc("note", new net.nan21.dnet.module.ad.data.dc.Note({}))

		.addDc("atch", new net.nan21.dnet.module.ad.data.dc.Attachment({multiEdit:true}))		

		.linkDc("item", "order",{fields:[ {childField:"salesOrderId", parentField:"id"} ]} )

		.linkDc("itemTax", "item",{fields:[ {childField:"salesOrderItemId", parentField:"id"} ]} )

		.linkDc("note", "order",{fields:[ {childField:"targetUuid", parentField:"uuid"},{childField:"targetType", parentField:"className"} ]} )

		.linkDc("atch", "order",{fields:[ {childField:"targetUuid", parentField:"uuid"},{childField:"targetType", parentField:"entityFQN"} ]} );		

	}