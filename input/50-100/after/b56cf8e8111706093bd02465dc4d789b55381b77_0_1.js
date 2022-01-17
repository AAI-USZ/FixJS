function(origin, args, cb) {
  if (window.location.hash === '#complete') cb();
  else {
    var fullURL = args;

    // store information in window.name to indicate that
    // we redirect here
    window.name = 'auth_with_primary';

    wc.detach();
    window.location = fullURL;
  }
}