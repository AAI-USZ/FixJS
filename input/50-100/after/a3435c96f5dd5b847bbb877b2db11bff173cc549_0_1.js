function(err, icon) {

      if (err) { return write404(req, res, err); }

      console.log("Favicon requested");

      res.writeHead(200, { "Content-Type": "image/x-icon"});

      res.end(icon);

    }