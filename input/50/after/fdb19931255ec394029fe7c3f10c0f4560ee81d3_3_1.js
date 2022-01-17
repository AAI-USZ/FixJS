function(doc, dt, dn) {
  var callback = function(r,rt) {
    
    // refresh listing
    cur_frm.mylist.run();

  }
  $c_obj(make_doclist(doc.doctype, doc.name),'add_update','',callback);
}