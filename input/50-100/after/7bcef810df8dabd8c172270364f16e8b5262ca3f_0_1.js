function(req, res){
  req.body.id = req.params.id;
  Data.update({id: req.params.id}, req.body, {upsert: true}, function(err){
    res.send('success');
  });
}