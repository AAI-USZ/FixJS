function(err, result){
      if (err) { error_handle(req, res, err); this.end(); return; }
      if (result === null) {
        res.send(404);
      }
      else {
        res.send(result);
      }
      this.end();
    }