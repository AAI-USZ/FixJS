function(options, cb){
				connect('vote', cb, {id: this.id}, options);
				//Spine wants to call save after updating attributes. disable.
				this.updateAttribute('votes', this.votes + 1, {disableAjax: true});
			}