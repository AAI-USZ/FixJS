function(cfg){
		var self = this;

		Y.one('body').on("key",  function(e) {
			self.makeNextContainerNavigable(_NEXT);
		},SHIFT_RIGHT_ARROW);

		Y.one('body').on("key",  function(e) {
			self.makeNextContainerNavigable(_PREV);
		},SHIFT_LEFT_ARROW);

		this.makeNextContainerNavigable();




    }