function (params, callback) {
  var response  = this.response,
      file      = path.join(DOWNLOAD_DIR, get_download_path(params.id));

  if (jobs[params.id]) {
    response.data = {status: 'processing'};
    callback();
    return;
  }

  path.exists(file, function (exists) {
    if (!exists) {
      // job not found
      response.data   = {status: 'error'};
      response.error  = 'Unknown font id (probably task crashed, try again).';
      callback();
      return;
    }

    // job done
    response.data = {status: 'finished', url: get_download_url(params.id)};
    callback();
  });
}