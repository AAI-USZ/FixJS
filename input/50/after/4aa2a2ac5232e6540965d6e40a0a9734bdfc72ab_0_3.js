function(){
		console.log("Saving path");
		savePolygon(path);

//IMPROVE THIS.
showArticles(null,function(err,data){
	$('section[role="main"]').html(data);
});
		
	}