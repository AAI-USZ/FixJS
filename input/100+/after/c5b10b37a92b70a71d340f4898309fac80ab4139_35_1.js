function(inv){

	var byType = {};
	var byObject = {};

	var createdByType = {};
	var delByType = {};

	var realObjKey = {};
	
	var all = []
	
	function notifyChanged(subjTypeCode, subjId, typeCode, id, path, op, edit, syncId, editId){
		_.assertLength(arguments, 9);
		_.assertArray(path);
		_.assertInt(syncId);
		_.assertInt(editId);

		_.assertInt(subjTypeCode);
		_.assertInt(subjId);

		//console.log('notifyChanged: ' + JSON.stringify([subjTypeCode, subjId, typeCode, id, path, op, edit, syncId, editId]).slice(0,300));
		
		var key = typeCode + ':' + id;
		if(realObjKey[editId] !== undefined && realObjKey[editId] !== key) _.errout('db code error: ' + realObjKey[editId] + ' ' + key + ' ' + editId);
		realObjKey[editId] = key;
		
		
		var t = byType[subjTypeCode];
		if(t !== undefined){
			//console.log('notifying ' + t.length + ' type listeners ' + typeCode + ' ' + id);
			for(var i=0;i<t.length;++i){
				var listener = t[i];
				
				//note that subjTypeCode and subjId are for the object of the type this listener is listening to,
				//whereas typeCode and id might be for any object related by an FK
				listener(subjTypeCode, subjId, typeCode, id, path, op, edit, syncId, editId);
			}
		}
		var ob = byObject//[subjTypeCode];
		//if(ob !== undefined){
			var obj = ob[subjId];
			if(obj !== undefined){
				//console.log('notifying ' + obj.length + ' object listeners');
				for(var i=0;i<obj.length;++i){
					var listener = obj[i];
					//listener(typeCode, id, path, op, edit, syncId, editId);
					listener(subjTypeCode, subjId, typeCode, id, path, op, edit, syncId, editId);
				}
			}
		//}
	}
	
	//note that the object referred to will always be the most local normalized object (and the path will be relative to that.)
	function objectChanged(destTypeCode, destId, typeCode, id, path, op, edit, syncId, editId){
		_.assertLength(arguments, 9);
		var already = {}
		internalObjectChanged(destTypeCode, destId, typeCode, id, path, op, edit, syncId, editId, already)
	}
	function internalObjectChanged(destTypeCode, destId, typeCode, id, path, op, edit, syncId, editId, already){
		_.assertLength(arguments, 10);
		_.assertInt(editId);
		_.assertInt(syncId);
		_.assertString(op)
		
		notifyChanged(destTypeCode, destId, typeCode, id, path, op, edit, syncId, editId);
		
		//TODO: what about cyclic dependencies?
		already[destId] = true
		inv.getInverse(destId, function(invArr){
			console.log('inverse: ' + invArr.length)
			for(var i=0;i<invArr.length;++i){
				var e = invArr[i];
				if(already[e[1]]){
					console.log('already notified: ' + e[1])
					continue;
				}
				console.log('inv e: ' + JSON.stringify(e));
				_.assertInt(e[0]);
				_.assertInt(e[1])
				internalObjectChanged(e[0], e[1], typeCode, id, path, op, edit, syncId, editId, already);
			}
		});
	}
	
	return {
		input: {
			objectChanged: function(typeCode, id, path, op, edit, syncId, editId){
				_.assertLength(arguments, 7);
				_.assertInt(syncId);
				_.assertInt(editId);
				_.assertString(op)
				_.assertInt(typeCode)
				_.assert(id > 0)
				
				console.log('broadcasting: ' + JSON.stringify(path))
				for(var i=0;i<path.length;++i){_.assert(_.isString(path[i]) || path[i] > 0);}
				
				all.forEach(function(listener){
					listener(typeCode, id, path, op, edit, syncId, editId);
				})
				objectChanged(typeCode, id, typeCode, id, path, op, edit, syncId, editId);
			},
			objectDeleted: function(typeCode, id, editId){
				var c = delByType[typeCode];
				if(c !== undefined){
					for(var i=0;i<c.length;++i){
						c[i](typeCode, id, editId);
					}
				}
			},
			objectCreated: function(typeCode, id, editId){
				_.assertLength(arguments, 3);
				_.assertInt(typeCode)
				var c = createdByType[typeCode];
				console.log('object created: ' + (c === undefined ? 0 : c.length) + '(tc: ' + typeCode + ', id: ' + id + ')');
				if(c !== undefined){
					for(var i=0;i<c.length;++i){
						c[i](typeCode, id, editId);
					}
				}
			}
		},
		output: {
			listenToAll: function(listener){
				all.push(listener)
			},
			//reports any edits that happen to an object of the given type (including to other normalized objects by FK)
			//useful in cases where it is inefficient to listen to each related object individually
			//i.e. the number of listeners is likely to be considerably smaller than the total number of objects being listened to
			//cb(typeCode, id, path, edit)
			listenByType: function(typeCode, listener){
				lazyArray(byType, typeCode).push(listener);
			},
			stopListeningByType: function(typeCode, listener){
				removeTypeListener(typeCode, listener, byType);
			},
			
			//reports any edits that happen to the given object (including to other normalized objects by FK)
			//cb(typeCode, id, path, edit)
			listenByObject: function(/*typeCode, */id, listener){
				_.assertLength(arguments, 2)
				//lazyArray(lazyObj(byObject, typeCode), id).push(listener);
				lazyArray(byObject, id).push(listener);
			},
			stopListeningByObject: function(/*typeCode, */id, listener){
				_.assertLength(arguments, 2)
				var objMap = byObject//byObject[typeCode];
				//if(objMap !== undefined){
					var listeners = objMap[id];
					if(listeners !== undefined){
						var ci = listeners.indexOf(listener);
						if(ci !== -1){
							listeners.splice(ci, 1);
							return;
						}
					}
				//}
				console.log('WARNING: tried to remove non-existent object listener: ' + typeCode + ', ' + id);
			},
			
			//cb(typeCode, id)
			listenForNew: function(typeCode, listener){
				var c = createdByType[typeCode];
				if(c === undefined) c = createdByType[typeCode] = [];
				c.push(listener);
			},
			stopListeningForNew: function(typeCode, listener){
				_.assertInt(typeCode)
				_.assertFunction(listener)
				removeTypeListener(typeCode, listener, createdByType);
			},
			
			//cb(typeCode, id)
			listenForDeleted: function(typeCode, listener){
				var c = delByType[typeCode];
				if(c === undefined) c = delByType[typeCode] = [];
				c.push(listener);
			},
			stopListeningForDeleted: function(typeCode, listener){
				removeTypeListener(typeCode, listener, delByType);
			}
		}
	};
}