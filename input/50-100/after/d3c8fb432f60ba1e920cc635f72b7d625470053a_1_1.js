function () {
		var wrapper;
		var card;
		wrapper = Ext.getCmp('typo3-contentContainerWrapper');

		if(wrapper) {
			card = wrapper.getLayout().activeItem;
			if(card.id == this.id) {
				return this.body.dom.src;
			} else if(typeof card.getUrl == 'function') {
				return card.getUrl();
			} else {
				return this.url;
			}
		}
	}