function(req, res){
	var pickedArticle = articles[req.params.id - 1];
	
	res.render("article", { title: "SFU ENGAGE",
							article : pickedArticle,
							user :  userobject,  
							status : "logged in"	 })
}