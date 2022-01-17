function(cfg){
		/*var node = this.get('node');
		Y.log('initializer');
		Y.log(node);
		if(node){
			this.registerNavigableContainer(node); //will update node-container.children as array
			Y.log('Navigable Container Object:','debug');
			Y.log(this.container,'debug');
		}*/
		var self = this;
		Y.one('body').on("key",  function(e) {
			//alert('asd');
			Y.log("============================");
			Y.log('Shift+RightArrow was pressed');
			self.makeNextContainerNavigable();
		},SHIFT_RIGHT_ARROW);

		this.makeNextContainerNavigable();

    }