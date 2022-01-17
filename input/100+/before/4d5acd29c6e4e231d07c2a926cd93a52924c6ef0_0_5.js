function() {
		var value = undefined;
		if (!this.cfilter.isHidden()) {
			value = this.cfilter.getValue();
		}else {
			if (this.edit_area.validate())
				value = strip_blanks(this.edit_area.getValue());
		}

		if (value) {
			if (typeof(value) != 'string')
				value = Ext.encode(value);

			log.debug('The filter is : ' + value, this.logAuthor);
			return value;
		}else {
			log.debug('Invalid JSON value', this.logAuthor);
			return undefined;
		}
	}