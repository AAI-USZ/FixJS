function(err, data) {

      if (err) { throw err; }

      console.log(data.toString());

      res.end(data.toString());

    }