function(tagValue) {
	if (typeof tagValue !== 'string') { tagValue = ''; }
	var type = '',
		text = '',
		count = 0,
		optional,
		nullable,
		variable;
	
	[type, text] = getTagType(tagValue);
	if (type === '') { text = tagValue; }
	
	[type, optional] = parseOptional(type);
	[type, nullable] = parseNullable(type);
	[type, variable] = parseVariable(type);

	type = parseTypes(type); // make it into an array

	return [type, text, optional, nullable, variable];
}