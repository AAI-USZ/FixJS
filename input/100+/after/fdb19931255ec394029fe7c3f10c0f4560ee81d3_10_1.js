function(doc, cdt, cdn) {
  var mydoc=doc;
  $c('runserverobj', args={'method':'check_state', 'docs':compress_doclist(make_doclist(doc.doctype, doc.name))},
    function(r,rt){
      if(r.message) {
        var doc = locals[mydoc.doctype][mydoc.name];
        doc.state = '';
        get_field(doc.doctype, 'state' , doc.name).options = r.message;
        refresh_field('state');
      }
    }  
  );
}