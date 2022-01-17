function(req, res){

	var wikipage = {
		title: req.body.title, 
    text: req.body.body,
    created_at : Date()
	};
  
  provider.createWikiPage(wikipage, function(err, new_wikipage){
	  return res.send(new_wikipage);     
  });	  
}