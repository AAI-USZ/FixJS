function(doc, cdt, cdn) {
  $c('runserverobj', args={'method':'to_date_validation','docs':compress_doclist(make_doclist(doc.doctype, doc.name))},
    function(r, rt) {
    var doc = locals[cdt][cdn];
    if (r.message) {
      alert("To date cannot be before from date");
      doc.to_date = '';
      refresh_field('to_date');
    }
    }
  ); 
}