function(obj){
	var keys=Object.getOwnPropertyNames(obj);
	var result={};
	for(var i=0,l=keys.length;i<l;i++){
		var k=keys[i];
		result[k]=this.jsonFilter(obj[k]);
	}
	return result;
}