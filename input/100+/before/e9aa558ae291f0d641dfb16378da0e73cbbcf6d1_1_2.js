function (params, callback) {
  var response  = this.response,
      job       = jobs[params.id],
      file      = path.join(DOWNLOAD_DIR, get_download_path(params.id));

  if (job) {
    response.data = {status: job.status, error: job.error};

    if (job.error) {
      // as long as user got info about error
      // remove the job from the cache
      delete jobs[params.id];
    }

    callback();
    return;
  }

  path.exists(file, function (exists) {
    if (!exists) {
      // hob not found
      response.error = {code: 'UNKNOWN_FONT_ID', message: "Unknown font id."};
      callback();
      return;
    }

    // job done
    response.data = {status: 'finished', url: get_download_url(params.id)};
    callback();
  });
}