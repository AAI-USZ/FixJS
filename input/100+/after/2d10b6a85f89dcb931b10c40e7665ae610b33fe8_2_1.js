function() {
	this.check_doctype_conflict(this.docname);

	var me = this;
	var ret_fn = function(r, rtxt) {
		// n tweets and last comment				
		me.runclientscript('setup', me.doctype, me.docname);
		me.refresh();
	}

	if(me.doc.__islocal) { 
		// reload only doctype
		$c('webnotes.widgets.form.load.getdoctype', {'doctype':me.doctype }, ret_fn, null, null, 'Refreshing ' + me.doctype + '...');
	} else {
		// reload doc and docytpe
		$c('webnotes.widgets.form.load.getdoc', {'name':me.docname, 'doctype':me.doctype, 'getdoctype':1, 'user':user}, ret_fn, null, null, 'Refreshing ' + me.docname + '...');
	}
}