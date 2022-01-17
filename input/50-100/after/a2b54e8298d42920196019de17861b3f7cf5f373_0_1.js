function(data, searchObj){
	data.sort = [{"commentCount":{"order":"desc"}},{"title.untouched":{"order":"asc"}}];
	return data;
}