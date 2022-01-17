function(json) {
		var that = this;
		if (json && json.data) {
			var jsonData = json.data;
			if (jsonData.length > 0) {
				enyo.log('first item: ' + JSON.stringify(jsonData[0]));
			}
			this.items = new io.TinyArray(jsonData).getTinyArray();
			enyo.log('after get tiny array: ' + this.items.length);
			this.$.mediaList.setCenterView(this.getView(1));

			setTimeout(function() {
				that.$.mediaList.previous();
			},
			50);
		}
	}