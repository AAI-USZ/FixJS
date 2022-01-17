function(dt, dn, fn, v) {
	var d = locals[dt][dn];
	var changed = d[fn] != v;
	if(changed && (d[fn]==null || v==null) && (cstr(d[fn])==cstr(v))) 
		changed = false;

	if(changed) {
		d[fn] = v;
		if(d.parenttype)
			d.__unsaved = 1;		
		this.set_unsaved();			
	}
}