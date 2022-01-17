function(token) {
		var string = this._getter.call(this._object_this);
		if(string != this.value)DOMStringCollection_init(this, string);

		if(token === "")_throwDOMException("SYNTAX_ERR");
		if(_String_contains.call(token + "", " "))_throwDOMException("INVALID_CHARACTER_ERR");
	}