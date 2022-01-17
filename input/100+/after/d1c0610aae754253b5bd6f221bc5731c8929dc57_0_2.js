function(cfg){
		var self = this;

		Y.one('body').on("key",  function(e) {
			Y.log("============================");
			Y.log('Shift+RightArrow was pressed');
			self.makeNextContainerNavigable(_NEXT);
		},SHIFT_RIGHT_ARROW);

		Y.one('body').on("key",  function(e) {
			Y.log("============================");
			Y.log('Shift+Left was pressed');
			self.makeNextContainerNavigable(_PREV);
		},SHIFT_LEFT_ARROW);

		this.makeNextContainerNavigable();




    }