function(caller, cdt, cdn) {
	if(!cdt)cdt = this.doctype;
	if(!cdn)cdn = this.docname;

	var ret = null;
	var doc = cur_frm.doc;
	try {
		if(this.cscript[caller])
			ret = this.cscript[caller](doc, cdt, cdn);
		// for product
		if(this.cscript['custom_'+caller])
			ret += this.cscript['custom_'+caller](doc, cdt, cdn);
	} catch(e) {
		console.log(e);
	}

	if(caller && caller.toLowerCase()=='setup') {

		var doctype = get_local('DocType', this.doctype);
		
		// js
		var cs = doctype.__js || (doctype.client_script_core + doctype.client_script);
		if(cs) {
			try {
				var tmp = eval(cs);
			} catch(e) {
				console.log(e);
			}
		}

		// css
		if(doctype.__css) set_style(doctype.__css)
		
		// ---Client String----
		if(doctype.client_string) { // split client string
			this.cstring = {};
			var elist = doctype.client_string.split('---');
			for(var i=1;i<elist.length;i=i+2) {
				this.cstring[strip(elist[i])] = elist[i+1];
			}
		}
	}
	return ret;
}