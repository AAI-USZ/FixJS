function(err, query){
    if (err) { error_handle(req, res, err); this.end(); return; }
    if (query === null) {
      res.send('query not found', 404);
      this.end();
      return;
    }
    this.getLastResult(query, function(err, result){
      if (err) { error_handle(req, res, err); this.end(); return; }
      if (result === null)
        res.send('result not found', 404);
      else
        res.send(result);
      this.end();
    });
  }