function(options, cb){
				connect('vote', cb, {id: this.id}, options);
				this.updateAttribute('votes', this.votes + 1);
			}