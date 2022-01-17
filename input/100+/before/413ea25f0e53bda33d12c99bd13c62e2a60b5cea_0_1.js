function selectPath(path, nodes, def){
			// Traverse path; the next path component should be among "nodes".
			var nextPath = path.shift();
			var nextNode = array.filter(nodes, function(node){
				return node.getIdentity() == nextPath;
			})[0];
			if(!!nextNode){
				if(path.length){
					tree._expandNode(nextNode).then(function(){ selectPath(path, nextNode.getChildren(), def); });
				}else{
					// Successfully reached the end of this path
					def.resolve(nextNode);
				}
			}else{
				def.reject("Could not expand path at " + nextPath);
			}
		}