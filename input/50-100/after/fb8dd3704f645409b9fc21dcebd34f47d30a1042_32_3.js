function(params) {
			this.startLayout();
			var i = 0,
				len = params.length;
			for(; i < len; i++) {
				this[i] = params[i];
			}
			this.finishLayout();
		}