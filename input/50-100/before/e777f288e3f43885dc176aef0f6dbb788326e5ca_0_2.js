function(builder, branch, revision, callback) {
  var options = {
    url: util.format('%s/job/%s/buildWithParameters', this._url, builder),
    qs : {'REV': revision}
  }

  this.log.infof('Forcing build of revision ${rev}', {
    rev: revision,
    options: options
  });
  request.get(options, callback);
}