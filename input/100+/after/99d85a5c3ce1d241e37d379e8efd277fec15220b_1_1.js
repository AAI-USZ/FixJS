function(options){
		//options is a object that expects to have
		//defaults, success callback, and error callback

		options = options || {};

		options.ajaxDefaults = _.extend({},this.ajaxDefaults,options.ajaxDefaults);

		if(options.ajaxDefaults){
			$.ajaxSetup(options.ajaxDefaults);
		}

		var self = this,
			data = (function(){
				var ret = {};
				ret.test = {};
				ret.test.temp = {myanem : "Ryan"};

				return self.flatten(self.attributes);
			})();
			
		$.ajax({
			url : this.saveUrl || this.url,
			data : data,
			success : options.success || function(){
				console.log("success saving model");
			},
			error : options.error || function(){
				console.log("error saving model");
			}
		});
	}