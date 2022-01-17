function(value){
						var v = valueOrId(value);
						assertPrimitiveType(v,p.type.members.primitive);
						c.push(v);
					}