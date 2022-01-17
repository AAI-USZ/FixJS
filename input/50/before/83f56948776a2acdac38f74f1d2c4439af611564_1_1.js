function(context){
	if (context == undefined) context = null;
	var module = ($('.__fuel_module_uri__', context).size()) ? $('.__fuel_module_uri__', context).val() : null;
	return module;
}