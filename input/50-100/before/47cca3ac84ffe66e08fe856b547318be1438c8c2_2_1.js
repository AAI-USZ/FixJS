function(token) {
		var thisObj = this, v = thisObj.value;

		if(thisObj.contains(token)//DOMStringCollection_checkToken(token) here
			)return;

		thisObj.value += ((v && !v.match(RE_DOMSettableTokenList_lastSpaces) ? " " : "") + token);

		this[this.length++] = token;

		if(thisObj._onchange)thisObj._onchange.call(thisObj._onchange_this, thisObj.value);
	}