function(context){
	if (window.fuel && window.fuel.module){
		return window.fuel.module;
	}
	if (context == undefined) context = null;
	var module = ($('.__fuel_module__', context).size()) ? $('.__fuel_module__', context).val() : null;
	return module;
}