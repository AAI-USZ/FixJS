function(name, path, parameters) {
      		var options = {};
      
      		parameters.forEach(function(p) {
      			options[p.name] = p.value;
      		});
      		
      		return new BlockNode(name, path, options);
      	}