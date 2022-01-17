function(data){
	if (!data.category) return new Error('missing parameters');
	return this.unsubscribe(data.category);
}