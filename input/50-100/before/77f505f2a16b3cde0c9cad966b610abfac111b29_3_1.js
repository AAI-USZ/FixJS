function parseNullable(type) {
	var nullable = null;
	
	// {?sometype} means nullable, {!sometype} means not-nullable
	if ( /^([\?\!])(.+)$/.test(type) ) {
		type = RegExp.$2;
		nullable = (RegExp.$1 === '?')? true : false;
	}
	
	return [type, nullable];
}