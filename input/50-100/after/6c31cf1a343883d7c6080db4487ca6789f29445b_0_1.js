function (streamID, startPage, perPage) {
		if (perPage == undefined) {
			perPage = 15;
		}
		
		var result='', ajax_url = 'http://api.tout.com/api/v1/streams/'+streamID+'/touts.json?per_page='+perPage+'&page='+startPage;
        
        $.ajax({
            url: ajax_url,
			async: false,
			success:function(data) {
				result = data; 
			}
	   });
	   return result;
	}