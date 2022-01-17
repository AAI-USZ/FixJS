function(request, response, next, group1, group2, group3) {
		console.log('Simpleportal -restfulmongo duplicated session being served.')
		var url_ = url.parse(request.url, true);
		var requesturl = url_.pathname.split('/');
		if(requesturl.length > 3){
			var collection = requesturl[3];
			
			request.url = request.url.replace('/mongo/' + collection , '/' +collection);
			var dbid = request.dbid||'default';
			
			var duplcatefield = 'id';
			if(request.query && request.query.id)
				duplcatefield = request.query.id;
			
			var StorageService = simpleportal.Service.StorageService;
			var storageService = new StorageService({dbid:dbid, collectionName:collection});
			query ={};
			query[duplcatefield] = {$exists:true};
			
			var previous;
			var duplicates = [];
            storageService.find(query, function(error, result){
            	if(!error && result)
	    			result.forEach( function(current) {
					  if(previous && current[duplcatefield] == previous[duplcatefield]){
						  if(duplicates.indexOf(previous) == -1)
							  duplicates.push(previous);
						  else
							  duplicates.push(current);
					  }
					  previous = current;
					});
				simpleportal.util.sendServiceResponse(response, error ,duplicates);
			}, {sorting:{sort:[[duplcatefield,1]]}});
		}else
			next();
	}