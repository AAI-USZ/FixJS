function() {
			var classes = typeof this.typeList !== 'undefined' ? this.typeList : '';
			return classes + ' ' + this.data.name ? this.data.name : '';
		}