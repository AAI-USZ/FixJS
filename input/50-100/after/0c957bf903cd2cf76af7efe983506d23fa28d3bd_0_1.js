function(err, data){
    if (err) { error_handle(req, res, err); this.end(); return; }
    if (data === null)
      res.send('query not found', 404);
    else
      res.send(data);
    this.end();
  }