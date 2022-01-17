function(options){
		//options is a object that expects to have
		//defaults, success callback, and error callback
		options = options || {};
		
		if(options.defaults){
			$.ajax.setup(options.defaults);
		}

		var self = this,
			data = (function(){
				var ret = {};
				for(var attr in self.attributes){
					ret[attr] = self.attributes[attr];
				}
				return ret;
			})();
			
		$.ajax({
			url : this.saveUrl || this.url,
			data : data,
			success : options.success || function(){
				//console.log("success saving model");
			},
			error : options.error || function(){
				//console.log("error saving model");
			}
		});
	}