function(){ //A function designed to compensate for lack of function(value = default)
	if(arguments.length < 1){throw 'ur doin it wrong. initVal function requires > 1 arguments'}
	for(var i = 0; i < arguments.length; i += 1){
		if(arguments[i] !== undefined && arguments[i] !== null){
			return arguments[i];
		}
	}
	return arguments[i];
}