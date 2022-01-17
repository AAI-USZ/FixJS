function(){
	var doc = cur_frm.doc;
	$c('runserverobj',args={ 'method':'check_status', 'docs':compress_doclist([doc])},
		function(r,rt){
			if(r.message == 'Converted'){
				msgprint("This lead is now converted to customer. Please create enquiry on behalf of customer");
			}
			else{
				n = createLocal("Opportunity");
				$c('dt_map', args={
					'docs':compress_doclist([locals["Opportunity"][n]]),
					'from_doctype':'Lead',
					'to_doctype':'Opportunity',
					'from_docname':doc.name,
					'from_to_list':"[['Lead', 'Opportunity']]"
				}
				, function(r,rt) {
						loaddoc("Opportunity", n);
					}
				);
			}
		}
	);
}