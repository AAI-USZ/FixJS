function(inSender, inEvent) {
		enyo.log('onItemTap');
		if(inSender.item) {
			enyo.log(JSON.stringify(inSender.item.images));
			document.location.href = inSender.item.images['standard_resolution']['url'];
		}
	}