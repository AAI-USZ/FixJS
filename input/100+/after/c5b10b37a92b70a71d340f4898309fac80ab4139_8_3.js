function(op, edit, syncId, editId){
	_.assertLength(arguments, 4);

	var local = this;
	/*
	if(path.length === 1 && (op === 'replaceInternalNew' || op === 'replaceInternalExisting')){

		if(op === 'replaceInternalExisting' ){
			if(this.getEditingId() !== syncId){

				var removeId = path[path.length-1];
				var objHandle = u.findObj(this.obj, removeId)
				
				if(!objHandle){
					_.errout('not sure what to do about a replace of something already missing!');
				}else{
			
					var newObj = this.getObjectApi(edit.newId);
					
					doListReplace(this, objHandle, newObj);

					return this.emit(edit, 'replace', objHandle, newObj)
				}
			}
			return stub;
		}else if(op === 'replaceInternalNew'){
			if(this.getEditingId() === syncId){
				var objHandle = this.get(edit.temporary);
				if(objHandle === undefined){
					var gotReal = this.get(edit.obj.object.meta.id)
					if(gotReal) throw new Error('got real but not temporary')
					if(objHandle === undefined){
						//_.errout('not got object being replaced')
						console.log('WARNING: did not reify new inner object created via replace - might already have been removed')
						return stub;
					}
				}
				objHandle.reify(edit.obj.object.meta.id)
				return stub
			}else{
				var removeId = path[path.length-1];
				var objHandle = this.get(removeId);
			
				_.assertObject(objHandle);
		
				var res = this.wrapObject(edit.obj.object, [], this)
				doListReplace(this, objHandle, res);
				res.prepare()
				objHandle.prepare()

				return this.emit(edit, 'replace', objHandle, res)				
			}	
		}else{
			_.errout('^TODO implement op: ' + op + ' ' + JSON.stringify(edit));			
		}
	}

	if(path.length === 1 && this.getEditingId() === syncId && op === 'remove'){
		return stub;	
	}

			

	if(path.length > 0){
	
		var a = this.get(path[0]);
		console.log('got(' + path[0] +'): ' + JSON.stringify(_.map(this.obj, function(v){return v.id();})))
		if(a === undefined){
			console.log('WARNING: did not descend into object in list - might already have been removed')
			return stub;
		}
		_.assertObject(a);	
		return a.changeListener(path.slice(1), op, edit, syncId);
	}	
	*/
	if(op === 'addedNew'){
		var id = edit.id//edit.obj.object.meta.id
		var temporary = edit.temporary
		if(this.getEditingId() === syncId){
			var objHandle = this.get(temporary);
			if(objHandle === undefined){
				console.log('warning: object not found in list: ' + temporary + ', might ok if it has been replaced')
				return;
			}
			objHandle.reify(id)
			return
		}else{
			_.assertInt(id)

			var res = this.wrapObject(id, edit.typeCode, [], this)
			this.obj.push(res)
			res.prepare()
			return this.emit(edit, 'add', res)
		}
	}else if(op === 'replaceExternalExisting'){
		if(this.getEditingId() !== syncId){

			//var removeId = edit.oldId//path[path.length-1];
			var objHandle = this.getObjectApi(edit.oldId)//u.findObj(this.obj, removeId)
			
			if(!objHandle){
				_.errout('not sure what to do about a replace of something already missing!');
			}else{
		
				var newObj = this.getObjectApi(edit.newId);
				
				doListReplace(this, objHandle, newObj);

				return this.emit(edit, 'replace', objHandle, newObj)
			}
		}
		return stub;
	}else if(op === 'replacedNew'){

		if(this.getEditingId() === syncId){
			var objHandle = this.get(edit.temporary);
			if(objHandle === undefined){
				var gotReal = this.get(edit.newId)
				if(gotReal) throw new Error('got real but not temporary')
				if(objHandle === undefined){
					//_.errout('not got object being replaced')
					console.log('WARNING: did not reify new inner object created via replace - might already have been removed')
					return stub;
				}
			}
			objHandle.reify(edit.newId)
			return stub
		}else{
			var removeId = edit.oldId//path[path.length-1];
			var objHandle = this.get(removeId);
		
			_.assertObject(objHandle);
	
			var res = this.wrapObject(edit.newId, edit.typeCode, [], this)
			doListReplace(this, objHandle, res);
			res.prepare()
			objHandle.prepare()

			return this.emit(edit, 'replace', objHandle, res)				
		}	
	}else if(op === 'shift'){
		if(this.getEditingId() !== syncId){

			_.assert(this.obj.length >= 1);
			var res = this.obj.shift();

			res.prepare()
			return this.emit(edit, 'shift', res)
		}else{
			return stub;
		}
	}else if(op === 'remove'){
		if(this.getEditingId() !== syncId){
			var res = this.get(edit.id);
			var index = this.obj.indexOf(res)
			if(index === -1){
				console.log('ignoring redundant remove: ' + edit.id);
			}else{
				this.obj.splice(index, 1);

				res.prepare()
				return this.emit(edit, 'remove', res)
			}
		}		
		return stub;
	}else if(op === 'addExisting' || op === 'addExistingViewObject'){
		if(this.getEditingId() !== syncId){
			//_.errout('^TODO implement op: ' + JSON.stringify(edit));
			console.log('addExistingEdit: ' + JSON.stringify(edit))
			var addedObj = this.getObjectApi(edit.id)
			this.obj.push(addedObj)
			addedObj.prepare()
			return this.emit(edit, 'add', addedObj)
		}	
		return stub;
	}else if(op === 'replaceInternalExisting' || op === 'replaceExternalExisting'){
		if(this.getEditingId() !== syncId){
			//_.errout('^TODO implement op: ' + op + ' ' + JSON.stringify(edit));
			var removeId = edit.oldId//path[path.length-1];
			var objHandle = this.get(removeId);
		
			_.assertObject(objHandle);
	
			var res = this.getObjectApi(edit.newId)//wrapObject(edit.newId, edit.typeCode, [], this)
			doListReplace(this, objHandle, res);
			res.prepare()
			objHandle.prepare()

			return this.emit(edit, 'replace', objHandle, res)
		}
		return stub;
	}else if(op === 'setObject'){
		if(this.getEditingId() !== syncId){
			_.errout('&TODO implement op: ' + JSON.stringify(edit));
		}	
		return stub;
	}else if(op === 'set'){
		if(this.getEditingId() !== syncId){
			_.errout('*TODO implement op: ' + JSON.stringify(edit));
		}	
		return stub;
	}else{
		_.errout('+TODO implement op: ' + op + ' ' + JSON.stringify(edit));
	}
}