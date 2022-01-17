function(type, args) {
	/* pridat do zasobniku udalosti */
	this._data.push({
		type: type,
		args: args,
		ts: new Date().getTime()
	});
	
	/* procistit zasobnik */
	while (this._data.length > this.LIMIT) { 
		this._data.shift(); 
		this._lost++;
	}
	
	/* je-li zapnuto, preposlat do nativniho */
	if (this.DEBUG && this._native) {
		var nativeMethod = this._native[type];
		if (!nativeMethod) { /* tuto metodu nativni konzole nema */
			nativeMethod = this._native.log;
			if (!nativeMethod) { return; } /* nativni konzole nema ani log, sereme na ni */
		}
		
		return nativeMethod.apply(this._native, args);
	}

	this.makeEvent("change");
}