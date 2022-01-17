function(method, model, options){  
			options.timeout = 3000;  
			options.dataType = "jsonp";  
			return Backbone.sync(method, model, options);  
		}