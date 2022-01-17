function(data, searchObj){
	if(searchObj.searchQuery === ''){
		console.log("search query is empty");
		data.query.bool.must = [{match_all:{}}];
	}

	data.query.bool.must.push({"term":{"user": searchObj.user}});

	return data;
}