function(method, model, options){  
			options.timeout = 10000;  
			options.dataType = "jsonp";  
			return Backbone.sync(method, model, options);  
		}