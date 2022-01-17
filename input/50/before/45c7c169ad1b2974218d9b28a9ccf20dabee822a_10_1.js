function(doc, cdt, cdn) {
	if(!doc.__islocal) get_field(doc.doctype, 'dt' , doc.name).permlevel = 1;
	cur_frm.cscript.dt(doc, cdt, cdn);
}