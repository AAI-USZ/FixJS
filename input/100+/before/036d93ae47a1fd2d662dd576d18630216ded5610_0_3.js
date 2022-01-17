function(err, jobs){
    if (err) return res.send({ error: err.message });
    res.send(jobs);
  }