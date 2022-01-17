function reifyTemporary(arr, temporary, realId, local){
	//var realId = edit.id;
	_.assertInt(realId)
	
	console.log('reifying temporary ' + temporary + ' -> ' + realId);
	var did = false;
	
	var index = findListElement(arr, temporary);
	if(index === undefined){
		console.log('WARNING: cannot reify missing object (might be ok if removed): real(' + realId + ') temporary(' + temporary + ') ' + JSON.stringify(arr));
		return;
	}
	
	var e = arr[index];
	if(_.isInteger(e)){
		arr[index] = realId
		local.parent.reifyExternalObject(temporary, realId);
	}else{
		console.log(JSON.stringify(e))
		_.assertEqual(e.meta.id, temporary);
		e.meta.id = realId;
	}

	console.log('reified temporary id ' + temporary + ' -> ' + realId);

	var key = temporary;
	if(local.apiCache[key]){
		var newKey = realId;
		_.assert(local.apiCache[newKey] === undefined);
		local.apiCache[newKey] = local.apiCache[key];
		local.apiCache[key].objectId = realId;
		delete local.apiCache[key];
		console.log('reified api cache entry');
	}
}