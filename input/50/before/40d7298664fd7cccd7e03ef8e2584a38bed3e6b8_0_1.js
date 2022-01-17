function(err, solution) {
      if (err) throw err;
      res.header('Content-Type', 'text/plain');
      res.send(solution.code);
    }