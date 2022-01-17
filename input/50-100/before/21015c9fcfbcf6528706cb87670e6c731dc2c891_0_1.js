function(err, job){
    if (err) return res.send({ error: err.message });
    job.state(state);
    job.save(function(err){
      if (err) return res.send({ error: err.message });
      res.send({ message: 'updated state' });
    });
  }