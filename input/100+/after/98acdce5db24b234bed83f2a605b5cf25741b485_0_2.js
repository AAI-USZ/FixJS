function(err, content) {

      if (err) {

        // Something went wrong at the layout, cannot use layout to render.
        res.statusCode = 500;
        res.send(500, "<html><h2>A fatal error occurred!</h2>" + "<p>" + (err.xMessage ? err.xMessage : err.message) + "</p>" + "<pre>" + err.stack + "</pre></html>");
        req.routeComplete(res);

      } else {

        res.setHeader('Content-Type', 'text/html');
        // Who am I?
        res.setHeader('X-Powered-By', 'Calipso');

        // render
        res.send(content);

        // Callback
        req.routeComplete(res);

      }

    }