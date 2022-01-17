function(results){
					Array.prototype.unshift.call(args, results);
					return util.QueryResults(array[method].apply(array, args));
				}