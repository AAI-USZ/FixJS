function(ob, string){
	output = {};
	var propList = string.split(',');
	for(var i = 0; i < propList.length; i += 1){
		output[propList[i]] = ob[propList[i]];
	}
	return output;
}