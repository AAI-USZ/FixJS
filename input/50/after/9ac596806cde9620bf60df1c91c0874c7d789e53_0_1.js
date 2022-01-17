function(model) {
			return this.filterType === false ? true : model.get('completed') == this.filterType;
		}