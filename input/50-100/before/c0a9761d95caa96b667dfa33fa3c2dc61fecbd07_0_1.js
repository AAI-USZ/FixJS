function(err) {
    if(err) {
      fs.unlinkSync(fetch_target);
      return _cb(err);
    }
    if(version == 'latest') {
      // clean up "latest.exe"
      nodist.determineVersion(fetch_target, function (err, real_version) {
        fs.renameSync(fetch_target, n.sourceDir+'/'+real_version+'.exe');
        _cb(null, real_version);
      });
    }else
    return _cb(null, version);
  }