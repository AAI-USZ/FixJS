function(index, left) {
		enyo.log('getView ' + index + left);
		if (this.items && this.items.length > index && index >= 0) {
			return {
				kind: 'io.TinyGrid',
				items: this.items[index]
			}
		} else {
			if(index < 0) {
				//show switch
			return {
				content: 'HOME'
			};
			} else {
				//show load more or anything else
			return {
				content: 'NEXT'
			};
			}
		}
	}