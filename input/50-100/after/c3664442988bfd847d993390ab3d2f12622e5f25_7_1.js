function () {
		this.collection.on( 'reset', this.addAll, this );
		this.collection.on( 'add', this.add, this );
		
		YJ.dispatch.on( 'switchList', this.switchList, this ); // 
	}