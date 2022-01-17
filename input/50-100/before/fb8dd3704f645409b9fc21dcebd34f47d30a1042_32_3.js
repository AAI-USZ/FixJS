function(params) {
			this.startLayout();
			for(var i in params) {
				this[i] = params[i];
			}
			this.finishLayout();
		}