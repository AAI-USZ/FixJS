function(dt, fn, dn) { 
	if(dn && local_dt[dt]&&local_dt[dt][dn]){
		return local_dt[dt][dn][fn];
	} else {
		if(wn.meta.docfield_map[dt]) var d = wn.meta.docfield_map[dt][fn];
		if(d) return d;
	}
	return {};
}