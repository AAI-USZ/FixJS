function makeNPMConfiguration(dir, target, callback) {
  async.parallel([
    //
    // Make the .npm folder for the npm cache
    //
    function makeDotNpm(next) {
      haibu.utils.mkdirp(path.join(dir, '..', '.npm'), next)
    },
    //
    // Make the .tmp folder for temporary npm files
    //
    function makeDotTmp(next) {
      haibu.utils.mkdirp(path.join(dir, '..', '.tmp'), next)
    },
    //
    // Create an empty .userconfig and .globalconfig for npm
    //
    async.apply(fs.writeFile, path.join(dir, '..', '.userconfig'), ''),
    async.apply(fs.writeFile, path.join(dir, '..', '.globalconfig'), '')
  ], callback);  
}