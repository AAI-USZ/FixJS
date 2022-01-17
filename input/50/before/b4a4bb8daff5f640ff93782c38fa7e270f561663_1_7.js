function(data){
	data.query.bool.must.push({"term":{"isInstructor": "true"}});
	//sort
	return data;
}