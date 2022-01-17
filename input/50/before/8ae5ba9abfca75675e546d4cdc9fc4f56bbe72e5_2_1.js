function(doc, dt, dn) {
  var callback = function(r,rt) {
    
    // refresh listing
    cur_frm.mylist.run();

  }
  $c_obj([doc],'add_update','',callback);
}