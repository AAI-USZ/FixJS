function(req, res){
  var type = req.params.type
    , state = req.params.state
    , from = parseInt(req.params.from, 10)
    , to = parseInt(req.params.to, 10)
    , order = req.params.order;

  if(order == 'desc'){
	  var swap = from;
	  from = -1-to;
	  to = -1-swap;
  }
  
  Job.rangeByType(type, state, from, to, order, function(err, jobs){
    if (err) return res.send({ error: err.message });
    res.send(jobs);
  });
}