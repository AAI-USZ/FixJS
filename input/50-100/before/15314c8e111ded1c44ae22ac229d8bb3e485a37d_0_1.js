function(cfg){
		var node = this.get('node');
		Y.log(node);
		if(node){
			this.registerNavigableContainer(node);
			Y.log(this.container,'debug');
		}
    }