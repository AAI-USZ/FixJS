function(value) {
		if (typeof(value) == 'string')
			value = Ext.decode(value);

		log.debug('The filter to set is : ' + Ext.encode(value), this.logAuthor);
		this.cfilter.setValue(value);
	}