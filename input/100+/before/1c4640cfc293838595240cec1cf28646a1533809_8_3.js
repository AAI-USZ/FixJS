function doResponse(req, res, next) {

  // If we are in install mode, and are not in the installation process, then redirect
  if (!calipso.config.get('installed') && !req.url.match(/^\/admin\/install/)) {
    calipso.silly("Redirecting to admin/install ...");
    calipso.app.doingInstall = true;
    res.redirect("/admin/install");
    return;
  }

  // If nothing could be matched ...
  if (!res.routeMatched) {
    calipso.log("No Calipso module routes matched the current URL.");
    res.statusCode = 404;
  }

  // Render statuscodes dealt with by themeing engine
  // TODO - this is not very clean
  if (res.statusCode === 404 || res.statusCode === 500 || res.statusCode === 200) {

    calipso.theme.render(req, res, function(err, content) {

      if (err) {

        // Something went wrong at the layout, cannot use layout to render.
        res.statusCode = 500;
        res.send("<html><h2>A fatal error occurred!</h2>" + "<p>" + (err.xMessage ? err.xMessage : err.message) + "</p>" + "<pre>" + err.stack + "</pre></html>");
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

    });

  } else {

    // Otherwise, provided we haven't already issued a redirect, then pass back to Express
    req.routeComplete(res);

  }

}