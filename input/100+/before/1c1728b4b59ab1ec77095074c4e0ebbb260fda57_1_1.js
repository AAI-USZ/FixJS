function(filter, autoLoad) {
		if (autoLoad == undefined)
			autoLoad = true;

		log.debug('Building filter request', this.logAuthor);
		if (this.baseFilter) {
			var newObject = this.baseFilter;
			newObject = this.getAndFilter([newObject, filter]);
		} else {
			var newObject = filter;
		}

		this.proxy.extraParams.filter = Ext.JSON.encode(newObject);
		log.debug('Filter: ' + this.proxy.extraParams.filter, this.logAuthor);

		if (autoLoad) {
			this.load();
		}
   }