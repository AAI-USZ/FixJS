function() {
	this.meta = get_local('DocType',this.doctype);
	this.perm = get_perm(this.doctype); // for create
	if(this.meta.istable) { this.meta.in_dialog = 1 }
	this.setup_print();
}