function (req, res, next) {
  if(req.connection.encrypted) {
    host_url_protocol = 'https:' + host_url;
    redirect_url_protocol = 'https:' + redirect_url;
  } else {
    host_url_protocol = 'http:' + host_url;
    redirect_url_protocol = 'http:' + redirect_url;
  }

  // Expose host_url to views
  app.expose({ host_url: host_url_protocol }, 'lambdaracer.current'); // FIX, is in the code multiple times
  app.expose({ redirect_url: redirect_url_protocol }, 'lambdaracer.current'); // FIX, is in the code multiple times

  next();
}