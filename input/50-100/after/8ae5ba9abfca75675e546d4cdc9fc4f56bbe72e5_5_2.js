function(doc, cdt, cdn) {
  var callback = function(r, rt){
    locals[cdt][cdn].set_options = r.message;
    refresh_field('set_options');
  }

  $c_obj(make_doclist(doc.doctype, doc.name),'get_options','',callback)
}