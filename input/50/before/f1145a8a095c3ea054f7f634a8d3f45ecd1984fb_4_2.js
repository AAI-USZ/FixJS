function(options, cb){
				connect('setgotit', cb, {id: this.id}, options);
				//Spine wants to call save after updating attributes. disable.
				this.updateAttribute('owned', true, {disableAjax: true});
			}