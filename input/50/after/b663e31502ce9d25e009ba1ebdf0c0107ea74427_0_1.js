function(options){
				if(options.repo) delete options.repo;
				return $.ajax({
					url:this.urls[options.action](options),
					dataType:respType,
					data:options
				});
			}