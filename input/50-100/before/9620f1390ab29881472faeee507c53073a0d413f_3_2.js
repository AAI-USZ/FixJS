function(index) {
		enyo.log('getView ' + index);
		if (this.items && this.items.length > index && index >= 0) {
			return {
				kind: 'io.TinyGrid',
				items: this.items[index]
			}
		} else {
			return {
				content: this.items[index]
			};
		}
	}