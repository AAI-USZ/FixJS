function(typeCode, id, editId){
				var c = delByType[typeCode];
				if(c !== undefined){
					for(var i=0;i<c.length;++i){
						c[i](typeCode, id, editId);
					}
				}
			}