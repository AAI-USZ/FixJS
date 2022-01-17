f
	//_.assertInt(typeCode);
	//_.assertDefined(sourceParent);	

	var n = this.objectApiCache[idOrViewKey];
	if(n !== undefined){
		return n
	}
	var obj = this.snap.objects[idOrViewKey];
	if(obj === undefined){
		console.log('snap: ' + JSON.stringify(this.snap))//JSON.stringify(typeList))
		console.log('edits: ' + JSON.stringify(this.editsHappened, null, 2))
		console.log('cache: ' + JSON.stringify(Object.keys(this.objectApiCache)))
		_.errout(this.editingId + ' no object in snapshot with id: ' + idOrViewKey);
	}
	console.log(idOrViewKey+': ' + JSON.stringify(obj).slice(0,500))
	_.assert(obj.length > 0)

	var typeCode = obj[0].op === 'madeViewObject' ? obj[0].edit.typeCode : obj[1].edit.typeCode//first edit is a made op
	var t = this.schema._byCode[typeCode];

	if(t === undefined) _.errout('cannot find object type: ' + typeCode);
	
	n = new TopObjectHandle(this.schema, t, obj, this, idOrViewKey);
	this.objectApiCache[idOrViewKey] = n;

	return n
	/*if(n){
		return n;
	}

	var typeList = this.snap.objects//[typeCode];

	//console.log('snap: ' + JSON.stringify(this.snap))
	
	if(typeList === undefined) _.errout('looking for a type of object the snapshot has none of: ' + typeCode);
	var obj = typeList[idOrViewKey];
	//console.log('snap: ' + JSON.stringify(typeList))
	if(obj === undefined){
		console.log('snap: ' + JSON.stringify(typeList))
		_.errout('no object in snapshot with id: ' + idOrViewKey);
	}

	var typeCode = obj.meta.typeCode
	var t = this.schema._byCode[typeCode];

	if(t === undefined) _.errout('cannot find object type: ' + typeCode);

	n = new TopObjectHandle(this.schema, t, obj, this, idOrViewKey);
	this.objectApiCache[idOrViewKey] = n;
	
	//if(!t.superTypes.invariant) n.registerSourceParent(sourceParent);
	
	return n;*/
}
