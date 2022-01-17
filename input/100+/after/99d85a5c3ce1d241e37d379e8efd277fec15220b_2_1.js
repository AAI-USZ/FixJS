function(obj,prefix){
		var self = this;

		return $.Deferred( function(dfd){
			var elem;

			obj = obj || self.model.attributes;

			if($.isArray(obj)){
				for(var i = 0; i < obj.length; i++){
					self.populate(obj[i]);
				}
			}

			for(var key in obj){
				if(typeof obj[key] !== 'object'){
					$elem = self.$el.find("#" + key);

					if(!$elem.length){
						$elem = self.$el.find("#" + prefix + '\\.' + key);
					}

					if($elem.length){
						self.set($elem,obj[key]);
					}
				}
				else{
					if(prefix){
						self.populate(obj[key],prefix + '\\.' + key);
					}
					else{
						self.populate(obj[key],key);
					}
				}
			}

			dfd.resolve();

		}).promise();
	}