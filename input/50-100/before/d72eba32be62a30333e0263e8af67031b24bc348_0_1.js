function (req, res, next) {
  if(req.connection.encrypted) {
    host_url_protocol = 'https:' + host_url;
  } else {
    host_url_protocol = 'http:' + host_url;
  }

  // Expose host_url to views
  app.expose({ host_url: host_url_protocol }, 'lambdaracer.current');

  next();
}