function addCommonFunctions(classPrototype){
	addRefreshFunctions(classPrototype);
	if(classPrototype.getEditingId === undefined) classPrototype.getEditingId = getEditingId;
	if(classPrototype.getObjectTypeCode === undefined) classPrototype.getObjectTypeCode = getObjectTypeCode;
	if(classPrototype.getObjectId === undefined) classPrototype.getObjectId = getObjectId;
	if(classPrototype.getObjectApi === undefined) classPrototype.getObjectApi = getObjectApi;
	if(classPrototype.wrapObject === undefined) classPrototype.wrapObject = wrapObject;
	if(classPrototype.getFullSchema === undefined) classPrototype.getFullSchema = getFullSchema;
	if(classPrototype.getPath === undefined) classPrototype.getPath = getPath;
	if(classPrototype.getSh === undefined) classPrototype.getSh = getSh;
	if(classPrototype.removeParent === undefined) classPrototype.removeParent = removeParent;

	if(classPrototype.createNewExternalObject === undefined) classPrototype.createNewExternalObject = createNewExternalObject;
	if(classPrototype.reifyExternalObject === undefined) classPrototype.reifyExternalObject = reifyExternalObject;
	
	if(classPrototype.addToApiCache === undefined) classPrototype.addToApiCache = addToApiCache;
	if(classPrototype.clearApiCache === undefined) classPrototype.clearApiCache = clearApiCache;
	if(classPrototype.getFromApiCache === undefined) classPrototype.getFromApiCache = getFromApiCache;
	if(classPrototype.uid === undefined) classPrototype.uid = propertyUidFunction;
	if(classPrototype.prepare === undefined) classPrototype.prepare = prepareStub;

	if(classPrototype.saveEdit === undefined) classPrototype.saveEdit = saveEdit;
}