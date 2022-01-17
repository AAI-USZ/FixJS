function(data, searchObj){
	data.query.bool.must.push({"term":{"user": searchObj.user}});
	return data;
}