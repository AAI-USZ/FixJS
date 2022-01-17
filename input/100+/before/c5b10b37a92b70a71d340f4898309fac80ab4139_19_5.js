function(id, path, op, edit, syncId, editId){
	_.assertLength(arguments, 6);
	//_.assertInt(syncId);
	_.assertString(op);
	_.assertInt(syncId);
	_.assert(_.isInt(id) || _.isString(id));
	_.assert(_.isInteger(syncId) || syncId === undefined);

	//console.log('SyncApi changeListener: ' + op + ' ' + JSON.stringify(edit).slice(0,1000))
	
	if(path.length === 0){
		if(op === 'objectSnap'){
			//_.assertDefined(edit.id);
			//_.assertDefined(edit.value);
			//
			console.log('edit: ' + JSON.stringify(edit))
			var obj = edit.value.object
			var realId = obj.meta.id
			if(this.snap.objects[realId]){
				//TODO replacing is an error except during setup
				var cur = this.snap.objects[realId]
				if(cur.meta.editId >= obj.meta.editId){
					console.log('already has and up to date: ' + realId + ' (' + cur.meta.editId + '>=' + obj.meta.editId + ')');
					return function(){}
				}else{
					console.log('already has ' + realId+', replacing');
				}
				//return function(){}
			}else{
				console.log('got new object ' + edit.type + ' ' + realId);
			}
			
			this.snap.objects[realId] = obj
		}else if(op === 'setObjectToJson'){
		
			if(this.snap.objects[id]){
				console.log('replacing ' + id);
			}
			
			this.snap.objects[id] = edit.object;
			
			var api = this.getObjectApi(id, this);
			_.each(edit.object, function(value, pcStr){
				var pc = parseInt(pcStr);
				if(pc !== 0){
					api.obj[pc] = value;
				}
			});
			api.cachedProperties = {};
			api.prepared = false;
			var typeCode = api.getObjectTypeCode();
			var objSchema = this.schema._byCode[typeCode];
			_.each(objSchema.properties, function(p){
				delete api[p.name]
			});
			
		
			api.prepare();
			api.refresh()();
		}else if(op === 'make'){
			
			if(edit.temporary){
				var meta = edit.obj.object.meta
				_.assert(meta.id >= 0)
				this.reifyExternalObject(meta.typeCode, edit.temporary, meta.id);
			}
			
			if(this.objectCreationCallbacks && this.objectCreationCallbacks[edit.uid]){
				var cbb = this.objectCreationCallbacks[edit.uid]
				if(cbb){
					//console.log('edit: ' + JSON.stringify(edit))
					cbb(edit.obj.object.meta.id);
				}
			}
		}else{
			_.errout('TODO implement top-level op: ' + JSON.stringify(edit));
		}
		return function(){}
	}else{
		//console.log(path);
		_.assertInt(path[0]);
		
		if(this.snap.objects[id] === undefined){
			console.log('ignoring edit for object not known to view: ' + id)
			return function(){}
		}
		
		var objApi = this.getObjectApi(id, this);
		
		var typeCode = objApi.getObjectTypeCode();
		var st = this.schema._byCode[typeCode];
		//if(st.isView) st = st.schema;
		if(st.propertiesByCode[path[0]] === undefined){
			_.errout('type ' + st.name + ' has no property with code ' + path[0]);
		}
		var propertyName = st.propertiesByCode[path[0]].name;
		_.assertString(propertyName);
		
		if(op === 'setObject' && path.length === 1){
			setPropertyValue(objApi.obj, path[0], edit.id);
			delete objApi.cachedProperties[propertyName]
			delete objApi[propertyName];
			objApi[propertyName] = objApi.property(propertyName);
			//console.log('set object!!!!!!!!!!!!1');
			if(this.root){
				return this.root.refresh(edit);
			}
			return this.refresh(edit);
		}else{
			var v = objApi.property(propertyName);
			_.assertObject(v);
			_.assertString(op)
			return v.changeListener(path.slice(1), op, edit, syncId);	
		}
	}
}