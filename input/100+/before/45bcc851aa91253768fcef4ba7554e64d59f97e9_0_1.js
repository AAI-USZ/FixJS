function(v,k) {
			var obj = {};
			obj[k] = Ti.App.Properties['get'+v](k, self.model.config.defaults[k]);
			self.model.set(obj); 
		}