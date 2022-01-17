function(results){
					Array.prototype.unshift.call(args, results);
					return util.QueryResults(dojo[method].apply(dojo, args));
				}