function(option){
            var options = (lang.isObject(option)) ? option : {};
			return this.forEach(function(node){
				var data = nodeData.get(node, 'tooltip');
				if(!data){ nodeData.set(node, 'tooltip', (data = new Tooltip(node, options))); }
				if(lang.isString(option)){ 
					data[option].call(data);
				}
			});
		}