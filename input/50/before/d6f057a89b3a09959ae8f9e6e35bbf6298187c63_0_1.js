function(data){
	if (!data.category) return;
	return this.subscribe(data.category);
}