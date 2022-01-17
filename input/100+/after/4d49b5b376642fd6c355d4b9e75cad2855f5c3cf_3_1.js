function(dt, dn, fn, v) {
	var d = locals[dt][dn];
	if(!d) {
		console.log("No " + dt + ": " + dn);
		return;
	}
	var changed = d[fn] != v;
	
	// nulls and empty strings are same
	if(changed && ((d[fn]==null && v=='') || (d[fn]=='' && v==null))) 
		changed = false;

	if(changed) {
		console.log(fn + ' changed from ' + d[fn] + ' to ' + v);
		d[fn] = v;
		if(d.parenttype)
			d.__unsaved = 1;
		this.set_unsaved();	
	}
}