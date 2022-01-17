function(req, res){	
	var updated_wikipage = {
		title: req.body.title, 
    text: req.body.body,
    created_at : req.body.created_at
	};  
	
	provider.updateWikiPage(req.params.wikipage, updated_wikipage, function(err, wikipage){
		return res.send(updated_wikipage); 	
	});  
}