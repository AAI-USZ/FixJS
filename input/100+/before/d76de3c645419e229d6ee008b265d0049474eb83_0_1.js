function(customItems) {
		this.$.cards.destroyClientControls();
		this.$.list.destroyClientControls();
		//
		var items = customItems || this.widgets;
		//
		// to sorted by submission date array
		items = this.toDateSortedArray(items);
		//
		for (var i=0, w; w=items[i]; i++) {
			var more = {info: w, ontap: "itemTap"};
			this.createComponent({kind: "Card", container: this.$.cards}, more);
			this.createComponent({kind: "ListItem", container: this.$.list}, more);
		}
		// to make cards in last row left-aligned
		for (var i=0; i<3; i++) {
			this.createComponent({kind: "Card", container: this.$.cards, classes: "card-empty"});
		}
		this.$.cards.render();
		this.$.list.render();
	}