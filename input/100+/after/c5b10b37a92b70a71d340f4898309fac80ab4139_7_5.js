function(op, edit, syncId){
	//console.log('%%%' + JSON.stringify(path) + ' ' + this.typeSchema.name);
	//var ps = this.typeSchema.propertiesByCode[path[0]];
	//_.assertObject(ps);
	
	if(op === 'setObject') _.errout('HMM')
	else if(op === 'setViewObject') _.errout('HMM')
	else{
		console.log('TODO: ' + op)
		console.log(new Error().stack)
		//process.exit(0)
		_.errout('TODO: ' + op)
	}
	/*
		setPropertyValue(this.obj, path[0], edit.value);
		return this.refresh(edit);
	}else{
		var ap = this.property(ps.name);
		var res;
		_.assertObject(ap);
		//if(ps.type.type === 'object'){
		//	res = ap.changeListener(path.slice(1), op, edit, syncId);
		//}else{
		console.log('descending into object: ' + JSON.stringify(edit))
		res = ap.changeListener(path.slice(1), op, edit, syncId);
		//}
		_.assertFunction(res);
		return res;
	}}
