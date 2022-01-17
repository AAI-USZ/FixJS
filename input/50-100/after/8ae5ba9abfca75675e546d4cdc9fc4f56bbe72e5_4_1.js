function(doc,dt,dn){
   $c('runserverobj', args={'method':'check_state', 'docs':compress_doclist(make_doclist(doc.doctype, doc.name))},
    function(r,rt){
      if(r.message) {
        set_field_options('state', r.message);
      }
    }  
  );

}