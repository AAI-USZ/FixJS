function(option) {
			var options = (lang.isObject(option)) ? option : {};
			return this.forEach(function(node) {
				var data = nodeData.get(node, 'collapse');
				if(!data){
					nodeData.set(node, 'collapse', (data = new Collapse(node, options)))
				}
				if (lang.isString(option)) {
					data[option].call(data);
				}
			});
		}