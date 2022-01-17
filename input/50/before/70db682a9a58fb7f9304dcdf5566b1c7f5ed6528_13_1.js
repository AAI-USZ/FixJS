function(doc, cdt, cdn) {
    
  if(!doc.price_list) set_multiple(cdt,cdn,{price_list:sys_defaults.price_list_name});
}