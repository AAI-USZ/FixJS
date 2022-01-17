function(cfg){
		var node = this.get('node');
		Y.log(node);
		if(node){
			this.registerNavigableContainer(node);
			Y.log('Navigable Container Object:','debug');
			Y.log(this.container,'debug');
		}
    }