function(inSender, inEvent) {
		enyo.log('onTinyItemTap');
		if(inSender.item) {
			enyo.log(JSON.stringify(inSender.item.images));
			//this.$.mediaList.hide();
			//this.$.photoGallery.show();
			//var url = inSender.item.images['standard_resolution']['url'];
			var url = inSender.item.link;
			//document.location.href = url;
			window.open(url, '_blank');
		}
	}