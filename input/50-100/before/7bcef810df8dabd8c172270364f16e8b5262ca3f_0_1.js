function(req, res){
  Data.update({id: req.params.id}, req.body, {upsert: true});
}