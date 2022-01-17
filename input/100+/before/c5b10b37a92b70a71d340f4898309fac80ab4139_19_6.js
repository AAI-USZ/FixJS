function(typeCode, temporaryId, realId){
	console.log('reifying id ' + temporaryId + ' -> ' + realId)
	
	var obj = this.snap.objects[temporaryId]
	delete this.snap.objects[temporaryId]
	this.snap.objects[realId] = obj

	console.log('*snap: ' + JSON.stringify(this.snap))
	
	var typeList = this.snap.objects
	typeList[realId] = typeList[temporaryId];
	delete typeList[temporaryId];
	var oldCacheKey = temporaryId;
	var newCacheKey = realId;
	if(this.objectApiCache[oldCacheKey]){
		this.objectApiCache[newCacheKey] = this.objectApiCache[oldCacheKey];
		delete this.objectApiCache[oldCacheKey];
		var objApi = this.objectApiCache[newCacheKey];
		objApi.objectId = realId;
		objApi.obj.meta.id = realId;
		
	}
}