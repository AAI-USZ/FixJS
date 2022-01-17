function(inSender, inItem) {
		var isNew = !this.bookmarkPin;
		this.bookmarkPin = this.$.map.updatePushpin(this.bookmarkPin, inItem.Latitude, inItem.Longitude,
			{icon: "images/poi_search.png", height: 48, width: 48});
		this.bookmarkPin.item = inItem
		if (isNew) {
			Microsoft.Maps.Events.addHandler(this.bookmarkPin, "mouseup", enyo.bind(this, "openInfobox"));
		}
		this.$.map.setCenter(inItem.Latitude, inItem.Longitude);
	}