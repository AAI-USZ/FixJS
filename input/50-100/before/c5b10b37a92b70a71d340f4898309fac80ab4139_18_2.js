function(value){
						if(value === undefined) _.errout('invalid data for property ' + p.name + ': ' + JSON.stringify(pv));
						//_.assertDefined(value);
						var v = valueOrId(value);
						assertPrimitiveType(v,p.type.members.primitive);
						c.push(v);
					}