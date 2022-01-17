function(index) {
		this.DOMStringCollection_check_currentValue_and_Token("1");//"1" - fakse token, need only thisObj.value check

		return this[index] || null;
	}