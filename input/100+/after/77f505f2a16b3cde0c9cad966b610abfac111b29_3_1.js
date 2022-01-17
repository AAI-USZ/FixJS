function(tagValue) {
	if (typeof tagValue !== 'string') { tagValue = ''; }
	var type = '',
		text = '',
		tagType,
		optional,
		nullable,
		variable;
	
	tagType = getTagType(tagValue);
    type = tagType.type;
    if (tagType.type === '') {
        text = tagValue;
    } else {
        text = tagType.text;
    }
	
	optional = parseOptional(type);
	nullable = parseNullable(type);
	variable = parseVariable(type);
	type = variable.type || nullable.type || optional.type;

	type = parseTypes(type); // make it into an array

	return {
	    type: type,
	    text: text,
	    optional: optional.optional,
	    nullable: nullable.nullable,
	    variable: variable.variable
	};
}