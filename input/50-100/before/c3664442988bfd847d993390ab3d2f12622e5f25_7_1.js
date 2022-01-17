function () {
		this.collection.on( 'reset', this.addAll, this );
		this.collection.on( 'add', this.add, this );
		this.collection.on( 'remove', this.removeItem, this );
		
		YJ.dispatch.on( 'switchList', this.switchList, this );
	}