function(dt, dn, from_amend) {
	var newdoc = LocalDB.create(dt);
	for(var key in locals[dt][dn]) {
		// dont copy name and blank fields
		var df = get_field(dt, key);
		if(key!=='name' && key.substr(0,2)!='__' &&
			!(df && ((!from_amend && cint(df.no_copy)==1) || in_list(LocalDB.no_copy_list, df.fieldname)))) { 
			locals[dt][newdoc][key] = locals[dt][dn][key];
		}
	}
	return locals[dt][newdoc];
}