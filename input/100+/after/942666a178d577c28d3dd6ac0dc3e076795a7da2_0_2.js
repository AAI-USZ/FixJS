function(req, res){
	res.send('here: ' + req.param('data', null));
}