function(data){
	if (!data.category) return new Error('missing parameters');
	return this.subscribe(data.category);
}