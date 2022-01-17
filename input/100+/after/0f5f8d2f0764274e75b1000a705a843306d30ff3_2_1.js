function(destination, source) {
		    for (var property in source) {
				if(source[property] instanceof Array) {
		            destination[property] = source[property].slice(0);
					if(source[property].parent)	destination[property].parent = source[property].parent;
		        }else if (typeof source[property] === "object" && source[property] !== null) {
		            destination[property] = destination[property] || {};
		            arguments.callee(destination[property], source[property]);
		        } else {
		            destination[property] = source[property];
		        }
		    }
		    return destination;
		}