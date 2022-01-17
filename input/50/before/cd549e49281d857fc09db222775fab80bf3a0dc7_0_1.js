function(success, error, context) {
			if (this.exists()) {
				this.constructor.remove(this.id, success, error, context);
			}
			this.destroy();
		}