function (request, response) {
        	var self = this;
        	
        	self.options.mouseSelected = 0; // important to distinguish between mouse select and keyborad select
                       
 	    	var q = request.term.replace(/^\s+|\s+$/g, ""); // trim away leading/trailing spaces 	    	
 	    	q = q.toLowerCase(); // so that capitalized search would work as solr analyzer uses only lowercase

			if ( q == '*' ){
				q = '*:*';
			}	

 	    	self.options.queryParams_gene.q = q;	
			
			//console.log(self.options.solrURL +'?'+ self._makeSolrURLParams(q));
        	$.ajax({
            	    url: self.options.solrBaseURL_bytemark + 'main/search',
            	    data: self.options.queryParams_gene,
            	    dataType: 'jsonp',
            	    jsonp: 'json.wrf',
            	    timeout: 10000,
            	    success: function (geneSolrResponse) { 
						self._doPipelineAutoSuggest(geneSolrResponse, q, response); 
            	    },
            	    error: function (jqXHR, textStatus, errorThrown) {
            	        response(['AJAX error']);
            	    }            	
        	});
    	}