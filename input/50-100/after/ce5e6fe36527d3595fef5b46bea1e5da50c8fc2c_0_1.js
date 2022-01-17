function(search, callback){

	if(!search){
		return;
	}

	var data = {
		query: {
			bool:{
				must:[{
						query_string: {
							default_field: '_all',
							query: search
						}
					}]
				}
			},
		from: 0,
		size: 20
	};

	mapping.search(data, function(err, data){
		if(data){
			callback(data);
		}
		else{
			console.log("Nothing found");
		}
	});
}