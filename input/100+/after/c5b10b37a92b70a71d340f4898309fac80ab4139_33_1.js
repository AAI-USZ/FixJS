function make(schema, ol){
	
	_.assertLength(arguments, 2);

	var indexing = indexingStub;
	
	var ap;
	
	var syncIdCounter = 1 || initialSyncIdCounter;
	
	function makeNewSyncId(){
		var syncId = syncIdCounter;
		++syncIdCounter;
		return syncId;
	}
	
	var ws = fs.createWriteStream('ap.log')
	
	var broadcaster
	
	function translateWithTemporaries(path, syncId){
		var ti = temporaryIdsBySync[syncId];

		var result = [].concat(path);
	
		for(var i=0;i<path.length;++i){
			var temporary = result[i]
			if(temporary >= 0) continue
			var id = ti[temporary]
			_.assertInt(id)
			result[i] = id
		}
		
		for(var i=0;i<result.length;++i){
			if(result[i] < 0){
				console.log(JSON.stringify(path) + ' -> ' + JSON.stringify(result));
				console.log(JSON.stringify(tp));
				_.errout('failed to fully translate path');
			}
		}
		
		return result;
	}
	
	var temporaryIdsBySync = {};
	function translateTemporary(temp, syncId){
		_.assertInt(temp)
		_.assertInt(syncId)
		_.assert(temp < -1)
		var real = temporaryIdsBySync[syncId].temporaryIds[temp];
		console.log('translating ' + temp + ' -> ' + real + ' (' + syncId + ')')
		console.log(JSON.stringify(temporaryIdsBySync[syncId]))
		_.assertInt(real)
		return real;
	}
	function mapTemporary(temp, real, syncId){
		_.assertInt(syncId)
		_.assert(temp < -1)
		var te = temporaryIdsBySync[syncId]
		if(te === undefined) te = temporaryIdsBySync[syncId] = {mappedIds: {}, temporaryIds: {}}
		
		if(te.mappedIds[real] !== undefined){
			_.errout('real id already mapped: ' + real);
		}
		if(te.temporaryIds[temp] !== undefined){
			_.errout('temporary id already mapped ' + temp + ' -> ' + temporaryIds[temp] + ', now being mapped to ' + real);
		}
		te.temporaryIds[temp] = real;
		te.mappedIds[real] = true;
	}

	function saveEdit(id, op, e, syncId){
		//TODO selectTopObject?

		if(op === 'selectObject'){
			if(e.id < 0) e.id = translateTemporary(e.id, syncId)
		}else if(op === 'reselectObject'){
			if(e.id < 0) e.id = translateTemporary(e.id, syncId)
		}

		
		if(currentId !== id && id !== -1){
			ap.selectTopObject({id: id})
			console.log('wrote selectTopObject(' + id + ')')
			ws.write('wrote selectTopObject(' + id + ')\n')
			currentId = id
		}
		
		ap[op](e)

		var n = ol.persist(id, op, e, syncId)
		ws.write(n.editId + ' ' + id + ' ' + op + ' ' + JSON.stringify(e)+' ' + syncId + '\n')
	}
	var currentId
	
	function persistEdit(typeCode, id, path, op, edit, syncId, computeTemporary, cb){
		_.assertLength(arguments, 8);
				
		_.assertInt(typeCode)
		_.assertInt(syncId);
		_.assertArray(path)
		_.assertString(op);
		_.assertFunction(computeTemporary)
		_.assertFunction(cb)
		
		var e = edit
		
		_.assert(pathControlEdits.indexOf(op) === -1)
		
		
		if(op === 'setString'){
		}else if(op === 'setInt'){
		}else if(op === 'setLong'){
		}else if(op === 'setBoolean'){
		}else if(op === 'putNew'){
		}else if(op === 'putString'){
		}else if(op === 'putInt'){
		}else if(op === 'putLong'){
		}else if(op === 'putBoolean'){
		}else if(op === 'del'){
		}else if(op === 'setObject'){
			if(e.id < 0){
				e.id = translateTemporary(e.id, syncId)
			}
		}else if(op === 'setData'){
		}else if(op === 'truncate'){
		}else if(op === 'append'){
		}else if(op === 'writeData'){
		}else if(op === 'addString'){
		}else if(op === 'addInt'){
		}else if(op === 'addLong'){
		}else if(op === 'addBoolean'){
		}else if(op === 'shift'){
		}else if(op === 'setToNew'){
		}else if(op === 'addNew'){
			_.assert(e.typeCode > 0)
		}else if(op === 'addExisting'){
			if(e.id < 0) e.id = translateTemporary(e.id, syncId)
		}else if(op === 'replaceInternalExisting'){
			if(e.newId < 0){
				e.newId = translateTemporary(e.newId, syncId)
			}
			if(e.oldId < 0){
				e.oldId = translateTemporary(e.oldId, syncId)
			}
			ap.replaceInternalExisting(e)
		}else if(op === 'replaceExternalExisting'){
			if(e.newId < 0){
				e.newId = translateTemporary(e.newId, syncId)
			}
			if(e.oldId < 0){
				e.oldId = translateTemporary(e.oldId, syncId)
			}
		}else if(op === 'removeString'){
		}else if(op === 'removeInt'){
		}else if(op === 'removeLong'){
		}else if(op === 'removeBoolean'){
		}else if(op === 'remove'){
			if(e.id < 0){
				e.id = translateTemporary(e.id, syncId)
			}
		}else if(op === 'removePrimitive'){
		}else if(op === 'replaceInternalNew'){
			if(e.id < 0){
				e.id = translateTemporary(e.id, syncId)
			}
		}else if(op === 'replaceExternalNew'){
			if(e.id < 0){
				e.id = translateTemporary(e.id, syncId)
			}
		}else if(op === 'selectProperty'){
			_.assert(e.typeCode > 0)
		}else if(op === 'reselectProperty'){
			_.assert(e.typeCode > 0)
		}else if(op === 'selectObject'){
			if(e.id < 0) e.id = translateTemporary(e.id, syncId)
		}else if(op === 'reselectObject'){
			if(e.id < 0) e.id = translateTemporary(e.id, syncId)
		}else if(op === 'selectStringKey'){
		}else if(op === 'selectIntKey'){
		}else if(op === 'selectLongKey'){
		}else if(op === 'selectBooleanKey'){
		}else if(op === 'reselectStringKey'){
		}else if(op === 'reselectIntKey'){
		}else if(op === 'reselectLongKey'){
		}else if(op === 'reselectBooleanKey'){
		}else if(op === 'ascend1'){
		}else if(op === 'ascend2'){
		}else if(op === 'ascend3'){
		}else if(op === 'ascend4'){
		}else if(op === 'ascend5'){
		}else if(op === 'ascend'){
		}else if(op === 'make'){
		}else{
			_.errout('TODO implement op: ' + op);
		}

		if(op !== 'make' && id < -1){//note that -1 is not a valid temporary id - that is reserved
			_.assertInt(id)
			var newId = translateTemporary(id, syncId);
			console.log('translated temporary id ' + id + ' -> ' + newId + ' (' + syncId + ')');
			id = newId;
		}
				
		var n = ol.persist(id, op, edit, syncId)
		var newId = n.id//may be undefined if not applicable for the edit type
		var editId = n.editId
		var realOp = n.op
		var realEdit = n.edit

		if(op === 'make'){
			currentId = newId
		}else if(currentId !== id && id !== -1){
			ap.selectTopObject({id: id})
			console.log('wrote selectTopObject(' + id + ')')
			ws.write('wrote selectTopObject(' + id + ')\n')
			currentId = id
		}
		
		if(op === 'putNew'){
			var temporary = computeTemporary()
			mapTemporary(temporary, newId, syncId)
		}else if(op === 'setToNew'){
			e.id = newId
			var temporary = computeTemporary()
			mapTemporary(temporary, newId, syncId)
		}else if(op === 'addNew'){
			var temporary = computeTemporary()
			mapTemporary(temporary, newId, syncId)
		}else if(op === 'replaceInternalNew'){
			var temporary = computeTemporary()
			mapTemporary(temporary, newId, syncId)
		}else if(op === 'replaceExternalNew'){
			var temporary = computeTemporary()
			mapTemporary(temporary, newId, syncId)
		}else if(op === 'setToNew'){
			e.id = newId
		}
			
		ws.write(editId + ' ' + id + ' ' + JSON.stringify(path) + ' ' + op + ' ' + JSON.stringify(edit)+' ' + syncId + '\n')
		console.log(editId + ' ' + id + ' ' + JSON.stringify(path) + ' ' + op + ' ' + JSON.stringify(edit)+' ' + syncId + '\n')
		
		ap[op](e)
	
		if(op === 'make'){

			var temporary = computeTemporary()
			_.assertInt(temporary)
			_.assertInt(newId)
			mapTemporary(temporary, newId, syncId)
			
			cb({editId: editId, id: newId, temporary: temporary});
			_.assert(newId >= 0)
			//es.objectCreated(edit.typeCode, newId, editId)
			console.log('object created: ' + e.typeCode + ' ' + newId + ' ' + editId)
			broadcaster.input.objectCreated(e.typeCode, newId, editId)
			return;
		}

		_.assertInt(id);
	
		//es.objectChanged(id, realOp, realEdit, syncId, editId)
		broadcaster.input.objectChanged(typeCode, id, path, realOp, realEdit, syncId, editId)	
		
		cb({editId: editId})
	}		
	var externalHandle = {
		setBroadcaster: function(b){
			broadcaster = b;
			//_.assertUndefined(es)
			//es = editstreamer.make(ol, b)
		},
		persistEdit: persistEdit,
		saveEdit: saveEdit,
		getInverse: function(id){
			_.errout('TODO, somewhere')
			/*_.assertLength(arguments, 1);
			//TODO when we implement the edits that cause this, implement the lookup/indexing for this
			//var lk = inverses[typeCode];
			var ts = inverses[id];
			if(ts === undefined) return [];
			else{
			
				var arr = [];
				_.each(ts, function(nts, typeCodeStr){
					var typeCode = parseInt(typeCodeStr);
					_.assertInt(typeCode)
					_.each(nts, function(count, idStr){
						arr.push([true, typeCode, parseInt(idStr)]);
					});
				});
				return arr;
			}*/
		},
		
		makeNewSyncId: makeNewSyncId,
		getSyncIdCounter: function(){//for RAFization only
			return syncIdCounter;
		},
		translateTemporaryId: function(id, syncId){
			return translateTemporary(id, syncId)
		},
		syntheticEditId: function(){
			ap.syntheticEdit({})
			return ol.syntheticEditId()
		}
	};
		
	return {
		external: externalHandle,
		setAp: function(newAp){
			ap = newAp;
		},
		setIndexing: function(newIndexing){
			indexing = newIndexing;
		}
	}
}