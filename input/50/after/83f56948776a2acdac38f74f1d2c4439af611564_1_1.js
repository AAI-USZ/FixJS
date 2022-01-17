function(context){
	if (context == undefined) context = null;
	var module = ($('.__fuel_module_uri__').length) ? $('.__fuel_module_uri__').val() : null;
	return module;
}