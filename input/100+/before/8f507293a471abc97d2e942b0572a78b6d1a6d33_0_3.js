function addListenersToPolygon(path){

	console.dir("ADJUSTED:",path);

	google.maps.event.addListener(path, "set_at", function(){
		console.log("Saving path");
		savePolygon(path);

//IMPROVE THIS.
showArticles(null,function(err,data){
	$('section[role="main"]').html(data);
});
		
	});

	google.maps.event.addListener(path, "insert_at", function(){
		console.log("Saving path");
		savePolygon(path);

//IMPROVE THIS.
	showArticles(null,function(err,data){
		$('section[role="main"]').html(data);
	});
		

	});	
}