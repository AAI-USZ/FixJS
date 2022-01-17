function(data){
	if (!data.category) return;
	return this.unsubscribe(data.category);
}