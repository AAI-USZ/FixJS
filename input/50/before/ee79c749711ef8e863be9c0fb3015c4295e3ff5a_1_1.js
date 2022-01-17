function(){
				if(!settings) {
					settings = parentContext ? _.extend({}, parentContext.getSettings()) : {};
				}
				return settings;
			}