function(typeCode, id, listener){
				var objMap = byObject[typeCode];
				if(objMap !== undefined){
					var listeners = objMap[id];
					if(listeners !== undefined){
						var ci = listeners.indexOf(listener);
						if(ci !== -1){
							listeners.splice(ci, 1);
							return;
						}
					}
				}
				console.log('WARNING: tried to remove non-existent object listener: ' + typeCode + ', ' + id);
			}