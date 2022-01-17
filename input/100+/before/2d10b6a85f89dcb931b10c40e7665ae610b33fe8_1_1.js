function make_doclist(dt, dn, deleted) {
	if(!locals[dt]) { return []; }
	var dl = [];
	dl[0] = locals[dt][dn];
	
	// get children
	for(var ndt in locals) { // all doctypes
		if(locals[ndt]) {
			for(var ndn in locals[ndt]) {
				var doc = locals[ndt][ndn];
				if(doc && doc.parenttype==dt && (doc.parent==dn||(deleted&&doc.__oldparent==dn))) {
					dl[dl.length]=doc;
					//if(deleted&&(doc.__oldparent==dn))alert(doc.name+','+doc.__oldparent);
				}
			}
		}
	}
	return dl;
}