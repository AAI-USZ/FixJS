function _static(cb) {
    // copy static files as-is
    ncp.ncp('static', 'out', cb);
  }