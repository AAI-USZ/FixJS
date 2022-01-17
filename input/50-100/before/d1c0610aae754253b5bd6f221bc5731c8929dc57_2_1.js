function(cfg){
		/*var node = this.get('node');
		if(node){
			this.registerNavigableContainer(node); //will update node-container.children as array
		}*/
		var self = this;
		Y.one('body').on("key",  function(e) {
			//alert('asd');
			self.makeNextContainerNavigable();
		},SHIFT_RIGHT_ARROW);

		this.makeNextContainerNavigable();

    }