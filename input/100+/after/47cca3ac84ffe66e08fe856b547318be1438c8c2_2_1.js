function(_DOMStringCollection, _string) {
	var thisObj = _DOMStringCollection,
		string = _string || "",//default value
		isChange = !!thisObj.length;

	if(isChange) {
		while(thisObj.length > 0)
			delete thisObj[--thisObj.length];

		thisObj.value = "";
	}

	if(string) {
		if(string = _String_trim.call(string)) {
			_String_split.call(string, RE_DOMSettableTokenList_spaces).forEach(DOMStringCollection_init_add, thisObj);
		}
		thisObj.value = _string;//empty value should stringify to contain the attribute's whitespace
	}			

	if(isChange && thisObj._setter)thisObj._setter.call(thisObj._object_this, thisObj.value);
}