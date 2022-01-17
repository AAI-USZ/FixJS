function(){
				var ret = {};
				for(var attr in self.attributes){
					ret[attr] = self.attributes[attr];
				}
				return ret;
			}