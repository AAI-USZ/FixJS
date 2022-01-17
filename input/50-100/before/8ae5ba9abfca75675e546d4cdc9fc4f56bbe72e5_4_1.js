function(doc,dt,dn){
   $c('runserverobj', args={'method':'check_state', 'docs':compress_doclist([doc])},
    function(r,rt){
      if(r.message) {
        set_field_options('state', r.message);
      }
    }  
  );

}