function(cb) {
  console.dir(this.config, this.path);

  try { var confString = JSON.stringify(this.config); }
  catch (e) {
    this.log.exception(e, 'Failed to save config.');
    cb(e);
  }

  fs.writeFile(this.path + 'config.json', confString, cb);
}