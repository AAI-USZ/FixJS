function(dt,dn){var doclist=make_doclist(dt,dn,1);$.each(doclist,function(i,v){v&&delete locals[v.doctype][v.name];});}