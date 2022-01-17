function(path, context) {
      		var rec;
      		
      		path = path.trim();
      		if (path === 'this') {
      			return context;
      		}
      	
      		rec = function(pathArray, context) {
      			var subcontext = context[pathArray.shift()];
      			
      			if (pathArray.length > 0) {
      				return rec(pathArray, subcontext);
      			} else {
      				return subcontext;
      			}
      		}
      		
      		try {
      			return rec(path.split('.'), context);
      		} catch(e) {
      			throw new Error("Cannot find path " + path + " in context");
      		}
      	}