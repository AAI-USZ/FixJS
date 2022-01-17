function() {
	// get perm
	var dt = this.parent_doctype?this.parent_doctype : this.doctype;
	var dn = this.parent_docname?this.parent_docname : this.docname;
	this.perm = get_perm(dt, dn);
	this.orig_perm = get_perm(dt, dn, 1);
				  
	if(!this.perm[0][READ]) { 
		if(user=='Guest') {
			// allow temp access? via encryted akey
			if(_f.temp_access[dt] && _f.temp_access[dt][dn]) {
				this.perm = [[1,0,0]]
				return 1;
			}
		}
		window.history.back();
		return 0;
	}
	return 1
}