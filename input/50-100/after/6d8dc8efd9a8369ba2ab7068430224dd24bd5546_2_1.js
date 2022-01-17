function(path, cb) {
    cb = cb || noop
    fs.exists(path, function(exists){
      //console.log('EXISTS: ' + exists)
      if (!exists) cb('Directory does not exist')
      exec('git status', { cwd:path }, function(err) {
        //console.log('IS REPO: ' + (!!err))
        if (err) cb('Git repo does not exist')
        cb(null, new Repository(path))
      })
    })
  }