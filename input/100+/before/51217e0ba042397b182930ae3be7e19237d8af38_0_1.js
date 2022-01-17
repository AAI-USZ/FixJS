function(input){
			var self = this;
			var termVal = input.replace(/^(.+)\s(:)\s(.+)/, '$3');
			var solrField = input.replace(/^(.+)\s(:)\s(.+)/, '$1').replace(/ /g, '_').toLowerCase();	
			var solrQStr = input;
			var solrParams= null;
	
			if ( MPI2.AutoComplete.mapping[termVal] ){
				
				var geneId = MPI2.AutoComplete.mapping[termVal];
					
				solrQStr = self.options.grouppingId + ':"' + geneId.replace(/:/g,"\\:") + '"';
				solrParams = self._makeSolrURLParams(solrQStr);					
				//console.log('MOUSE1: '+ solrQStr + ' -- ' + ui.item.value + ' termVal: ' + termVal);				
				self._trigger("loadSideBar", null, { queryString: solrQStr, geneFound: 1 });
			}	
			else if (input.indexOf(':') != -1 ) {				
				// user should have selected a term other than gene Id/name/synonym
				// fetch all MGI gene ids annotated to this term					
				solrQStr = solrField + ':' + '"' + termVal + '"';
				solrParams = self._makeSolrURLParams(solrQStr);					
				//console.log('MOUSE2: '+ solrQStr + ' -- ' + ui.item.value + ' termVal: ' + termVal);									
				self._trigger("loadSideBar", null, { queryString: solrQStr });								
			}					
			else {
				self._trigger("loadSideBar", null, { queryString: solrQStr });
			}
			self._trigger("loadGenePage", null, { queryString: solrQStr, queryParams: solrParams});	
		}