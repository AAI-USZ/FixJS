function selectPath(schema, obj, path){
	_.assertLength(arguments, 3);
	_.assertObject(obj);
	
	//console.log('path: ' + JSON.stringify(path));
	var typeCode = obj.meta.typeCode;
	var sc = schema._byCode[typeCode];
	if(path.length === 0) return obj;
	var res = selectPathOnObject(schema, sc, obj, path);
	//console.log('result: ' + JSON.stringify(res));
	return res;
}