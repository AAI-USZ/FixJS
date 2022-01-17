function(fn, key, val, doc) {
	if(!doc && (cur_frm.doc))doc = cur_frm.doc;
	try{
		local_dt[doc.doctype][doc.name][fn][key] = val;
		refresh_field(fn);
	} catch(e) {
		alert("Client Script Error: Unknown values for " + doc.name + ',' + fn +'.'+ key +'='+ val);
	}
}