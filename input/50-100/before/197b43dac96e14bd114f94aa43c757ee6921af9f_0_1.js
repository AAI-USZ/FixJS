function(err, result){
      if (err) { error_handle(req, res, err); this.end(); return; }
      res.send(result);
      this.end();
    }