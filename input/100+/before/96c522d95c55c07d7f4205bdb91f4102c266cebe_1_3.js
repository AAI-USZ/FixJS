function(data) {
			var f = this;
			tryLoad(data,['name','type','definition','language'],this);
			if('parameters' in data) {
				data.parameters.map(function(p) {
					f.parameters.push(new FunctionParameter(this,p[0],p[1]));
				});
			}
		}