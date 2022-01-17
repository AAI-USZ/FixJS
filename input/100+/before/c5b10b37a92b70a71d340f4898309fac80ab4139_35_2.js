function(invArr){
			for(var i=0;i<invArr.length;++i){
				var e = invArr[i];
				//console.log('inv e: ' + JSON.stringify(e));
				_.assertInt(e[0]);
				_.assertInt(e[1])
				objectChanged(e[0], e[1], typeCode, id, path, op, edit, syncId, editId);
			}
		}