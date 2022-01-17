function(path){
			var d = new Deferred();

			// normalize path to use identity
			path = array.map(path, function(item){
				return lang.isString(item) ? item : tree.model.getIdentity(item);
			});

			if(path.length){
				selectPath(path, [tree.rootNode], d);
			}else{
				d.reject(new Tree.PathError("Empty path"));
			}
			return d;
		}