function(req, res){
  var post;
  post = new Post({
    text: req.body.text,
    name: req.body.name,
    user: mongoose.Types.ObjectId(req.body.user._id)
  });
  post.save(function(err) {
    if (!err) {
      return console.log("created");
    }
  });
  
	var joinedpost = {
		_id  : post._id,
		name : post.name,
		text : post.text,
		user : req.body.user
	};
  return res.send(joinedpost);    	  
 
}