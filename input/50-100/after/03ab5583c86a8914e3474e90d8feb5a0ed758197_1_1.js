function(req, res){
  var cid = req.params.cid;
  var t   = new Date(req.params.yyyy, parseInt(req.params.mm) -1, req.params.dd);
  var options = {};  // TODO: more detailed filter (such as time)

  query.getProgramListByDate(cid, t, function(err, list){
    err ? next(err) : res.json(list);
  });
}