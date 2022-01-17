function (err, real_version) {
        fs.renameSync(fetch_target, n.sourceDir+'/'+real_version+'.exe');
        _cb(null, real_version);
      }