function emitEdit(e){
		console.log(dd + ' sync sequencer emitting(' + oldest() + '): ' + JSON.stringify(e))

		if(e.editId < latestSent){
			_.errout('out-of-order emitting happening: ' + latestSent + ' > ' + e.editId + ': ' + JSON.stringify(e))
		}
		latestSent = e.editId
		/*if(isView[e.typeCode] && viewObjects[e.id] === undefined){
			viewObjects[e.id] = true
			console.log('emitting automatically: madeViewObject: ' + e.edit.id)
			emitEdit({typeCode: -1, id: -1, path: [], op: 'madeViewObject', edit: {typeCode: e.typeCode, id: e.id}, editId: e.editId})
		}*/
		


		//console.log('***********')
		//console.log('***********')
		
		// we pass the deduplication task downstream
		if(_.isInt(e.edit.id)){//for view objects, we require that the constructing variables correctly include them
			if(e.op === 'addExisting'){
				includeObjectCb(e.edit.id, e.editId)
			}else if(e.op === 'setObject'){
				includeObjectCb(e.edit.id, e.editId)
			}
		}
		if(_.isInt(e.edit.newId)){
			if(e.op === 'replaceInternalExisting'){
				includeObjectCb(e.edit.newId, e.editId)
			}else if(e.op === 'replaceExternalExisting'){
				includeObjectCb(e.edit.newId, e.editId)
			}
		}
		//if(knownIds[e.id] === undefined){
		//	console.log('WARNING: extraneous edit was about to be emitted by sequencer, ignored due to the object not being known: ' + JSON.stringify(e))
		//}
		/*if(_.isInt(e.id) && e.id !== -1){
			includeObjectCb(e.id, -1)//e.editId)
		}*/
		
		_.assertArray(e.path)
		editCb(e)
	}