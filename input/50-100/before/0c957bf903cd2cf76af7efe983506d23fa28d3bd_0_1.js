function(err, data){
    if (err) { error_handle(req, res, err); this.end(); return; }
    if (data === null)
      res.send({state:'query not found'});
    else
      res.send(data);
    this.end();
  }