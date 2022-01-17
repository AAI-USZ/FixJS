function(inSender, inEvent) {
		enyo.log('onItemTap');
		if(inSender.item) {
			enyo.log(JSON.stringify(inSender.item.images));
		}
	}