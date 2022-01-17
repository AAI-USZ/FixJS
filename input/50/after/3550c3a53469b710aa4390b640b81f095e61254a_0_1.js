function(map){
	var thisClosure = this;
	if(map){
		map.on('click', function(e){
			thisClosure.mapClick.apply(thisClosure, [e]);
		});
	}
}