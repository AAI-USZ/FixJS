function(ptarget_uuid, pageNum, appType, callback){
	var data = {
		  query: {
			  term: {
				  target_uuid: ptarget_uuid
			  }
		  },
		from: paging(pageNum),
		size: sizeOfResult
	};

	switchIndex(appType);
	switchMapping(1);

	mapping.search(data, function(err, data){
		if(data.hits.total !== 0){
			addUsersToData(data, callback);
		}
		else{
			callback(err);
		}
	});
}