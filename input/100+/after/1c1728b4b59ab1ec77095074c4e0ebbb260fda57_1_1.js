function(filter, autoLoad) {
		if (autoLoad == undefined)
			autoLoad = true;

		log.debug('Building filter request', this.logAuthor);
		log.debug('baseFilter:', this.logAuthor);
		log.dump(this.baseFilter)
		log.debug('filter:', this.logAuthor);
		log.dump(filter)		
		
		if (this.baseFilter) {
			var newObject = this.baseFilter;
			newObject = this.getAndFilter([newObject, filter]);
		} else {
			var newObject = filter;
		}

		log.debug('Final Filter:', this.logAuthor);
		log.dump(newObject)
		
		this.proxy.extraParams.filter = Ext.JSON.encode(newObject);

		if (autoLoad) {
			this.load();
		}
   }