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
			console.log('notifying ' + t.length + ' type listeners ' + typeCode + ' ' + id);
			for(var i=0;i<t.length;++i){
				var listener = t[i];
				
				//note that subjTypeCode and subjId are for the object of the type this listener is listening to,
				//whereas typeCode and id might be for any object related by an FK
				listener(subjTypeCode, subjId, typeCode, id, path, op, edit, syncId, editId);
			}
		}
		var ob = byObject[subjTypeCode];
		if(ob !== undefined){
			var obj = ob[subjId];
			if(obj !== undefined){
				console.log('notifying ' + obj.length + ' object listeners');
				for(var i=0;i<obj.length;++i){
					var listener = obj[i];
					listener(typeCode, id, path, op, edit, syncId, editId);
				}
			}
		}
	}