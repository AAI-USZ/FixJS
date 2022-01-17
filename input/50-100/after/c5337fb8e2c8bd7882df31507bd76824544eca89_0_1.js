function(options){
				var myoption = $.extend({}, options);
				if(myoption.repo) delete myoption.repo;
				return $.ajax({
					url:this.urls[options.action](options),
					dataType:respType,
					data:myoption
				});
			}