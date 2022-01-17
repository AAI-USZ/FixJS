function(type, data) {
		var event = Ext.create('BGT.Event', {
			timestamp:new Date(),
			type:type,
			data:data
		});
		store.insert(0, event);
		while (store.getCount() > 30) store.removeAt(30);
	}