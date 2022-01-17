function(ctor) {
	ctor.FROZEN = true; /* priznak zmrazeni */
	
	/* nejprve projit vlastni funkce a vsechny je znasilnit */
	for (var p in ctor.prototype) {
		if (p == "$super") { continue; } /* neobalujeme */
		if (p == "_$super") { continue; } /* neobalujeme */
		if (!ctor.prototype.hasOwnProperty(p)) { continue; } /* jen vlastni */
		var v = ctor.prototype[p];
		if (typeof(v) != "function") { continue; } /* jen funkce */
		if (v.NAME) { continue; } /* ne JAK tridy */
		
		this._freezeMethod(v, p, ctor);
	}
	
	/* rekurzivne zavolat na predcich a rozhranich */
	if (ctor.EXTEND && !ctor.EXTEND.FROZEN) { this.freeze(ctor.EXTEND); }
	for (var i=0;i<ctor.IMPLEMENT.length;i++) {
		var iface = ctor.IMPLEMENT[i];
		if (!iface.FROZEN) { this.freeze(iface); }
	}
}