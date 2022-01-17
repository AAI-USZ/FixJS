function(err, data) {

      if (err) { return write404(req, res, err); }

      console.log("Var serving " + path);

      res.end(data);

    }