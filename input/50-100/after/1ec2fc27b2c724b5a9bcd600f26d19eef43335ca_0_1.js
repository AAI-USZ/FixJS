function(part, idx, ary){
				if(!parent[part]){
					parent[part] =  {
						__id: parts.slice(0, idx+1).join("/"),
						__name: part,
						__type: idx+1 < parts.length ? "namespace" : moduleHash[k].value._type
					};
				}
				parent = parent[part];
			}