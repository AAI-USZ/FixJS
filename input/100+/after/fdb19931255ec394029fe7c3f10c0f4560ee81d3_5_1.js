function(){
	var doc = cur_frm.doc;
	$c('runserverobj',args={ 'method':'check_status', 'docs':compress_doclist(make_doclist(doc.doctype, doc.name))},
		function(r,rt){
			if(r.message == 'Converted'){
				msgprint("This lead is already converted to customer");
			}
			else{
				n = createLocal("Customer");
				$c('dt_map', args={
					'docs':compress_doclist([locals["Customer"][n]]),
					'from_doctype':'Lead',
					'to_doctype':'Customer',
					'from_docname':doc.name,
					'from_to_list':"[['Lead', 'Customer']]"
				}, 
				function(r,rt) {
					loaddoc("Customer", n);
				}
				);
			}
		}
	);
}