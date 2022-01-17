function(dt, dn)  {
	var d = locals[dt][dn];
	if(!d.__islocal) // newly created (not required to tag)
		d.__oldparent = d.parent;
	d.parent = 'old_parent:' + d.parent; // should be ..
	d.docstatus = 2;
	d.__deleted = 1;
}