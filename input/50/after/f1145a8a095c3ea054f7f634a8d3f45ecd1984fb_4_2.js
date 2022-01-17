function(options, cb){
				connect('setgotit', cb, {id: this.id}, options);
				this.updateAttribute('owned', true);
			}