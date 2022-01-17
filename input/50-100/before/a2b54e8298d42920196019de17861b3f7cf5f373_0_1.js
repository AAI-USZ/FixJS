function(data, searchObj){
	if(searchObj.searchQuery === ''){
		console.log("search query is empty");
		data.query.bool.must = [{match_all:{}}];
	}
	data.sort = [{"commentCount":{"order":"desc"}},{"title.untouched":{"order":"asc"}}];

	return data;
}