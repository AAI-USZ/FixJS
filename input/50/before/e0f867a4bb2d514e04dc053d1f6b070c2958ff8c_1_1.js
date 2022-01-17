function(req, res){
	
	res.render("article", { title: "SFU ENGAGE",
							user :  userobject,  
							status : "logged in"	 })
}