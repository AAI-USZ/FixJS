function(v,k) {
			Ti.App.Properties['set'+v](prefix + k, self.model.get(k));
		}