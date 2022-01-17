function objectChanged(destTypeCode, destId, typeCode, id, path, op, edit, syncId, editId){
		_.assertLength(arguments, 9);
		_.assertInt(editId);
		_.assertInt(syncId);
		_.assertString(op)
		
		notifyChanged(destTypeCode, destId, typeCode, id, path, op, edit, syncId, editId);
		
		//TODO: what about cyclic dependencies?
		inv.getInverse(destId, function(invArr){
			for(var i=0;i<invArr.length;++i){
				var e = invArr[i];
				//console.log('inv e: ' + JSON.stringify(e));
				_.assertInt(e[0]);
				_.assertInt(e[1])
				objectChanged(e[0], e[1], typeCode, id, path, op, edit, syncId, editId);
			}
		});
	}