function(cfg){
		var self = this;
		Y.one('body').on("key",  function(e) {
			//alert('asd');
			Y.log("============================");
			Y.log('Shift+RightArrow was pressed');
			self.makeNextContainerNavigable();
		},SHIFT_RIGHT_ARROW);

		this.makeNextContainerNavigable();

    }