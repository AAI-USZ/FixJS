function(node){
				var w = registry.getEnclosingWidget(node);
				if (w){return w;}

				return {
					domNode: node,
					region: dattr.get(node,"region")
				}
			}