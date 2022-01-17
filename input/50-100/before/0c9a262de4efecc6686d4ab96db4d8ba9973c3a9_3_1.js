function(doc, cdt, cdn){
  var callback = function(r, rt){
    set_field_options('select_doc_for_series', r.message);
  }
  $c_obj(make_doclist(doc.doctype, doc.name),'get_transactions','',callback);
  cur_frm.cscript.refresh();
  // add page head
  //var ph = new PageHeader(cur_frm.fields_dict['head_html'].wrapper, 'Setup Series', 'Set prefix for numbering series on your transactions');
}