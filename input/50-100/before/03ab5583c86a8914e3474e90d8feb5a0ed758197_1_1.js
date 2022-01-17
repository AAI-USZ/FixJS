function(req, res){
  var cid = req.params.cid;
  var t   = new Date(req.params.yyyy, req.params.mm, req.params.dd);
  var options = {};  // TODO: more detailed filter (such as time)

  query.getProgramListByDate(cid, t, function(err, list){
    err ? next(err) : res.json(list);
  });
}