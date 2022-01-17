function (promise) {
				promise._base = this;
				this.promises.push(promise);
			}