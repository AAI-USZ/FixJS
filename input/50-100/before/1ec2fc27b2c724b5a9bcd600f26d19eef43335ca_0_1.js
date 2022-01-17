function(part, idx, len){
				if(!parent[part]){
					parent[part] =  {
						__id: parts.slice(0, idx+1).join("/"),
						__name: part,
						__type: idx+1 < len ? "namespace" : moduleHash[k].value._type
					};
				}
				parent = parent[part];
			}