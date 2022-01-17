function(success, error, context) {
			var successFunc = function() {
				this.destroy();
				if (success) success.call(context);
			};
		
			if (this.exists()) {
				this.constructor.remove(this.id, Class.proxy(successFunc, this), error, context);
			}
		}