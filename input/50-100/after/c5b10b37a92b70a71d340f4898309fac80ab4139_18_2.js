function(value){
						var v = valueOrId(value);
						assertPrimitiveType(v,p.type.members.primitive);
						var ts = getTypeSuffix(p.type.members.primitive)
						edits.push({op: 'add'+ts, edit: {value: v}})
					}