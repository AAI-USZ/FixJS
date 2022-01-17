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