function(name){
	for(var i = 0; i < this._effects.length; i++){
		var effect	= this._effects[i];
		if( effect.name === name )	return effect;
	}
	return null;
}