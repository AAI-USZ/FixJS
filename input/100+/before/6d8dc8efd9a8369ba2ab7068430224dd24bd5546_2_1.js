function(startHash, cb) {
    if (typeof startHash == 'function') {
      cb = startHash
      startHash = false
    }
    // git show --pretty="format:hash:%H%ndate:%ci%nmess:%n%s%nfile:" --name-only
    exec('git log --no-merges --pretty=format:"%H"', { cwd:this.path }, function(err, stdout, stderr) {
      var hashes = stdout.toString()
      console.log(hashes)
      if (!hashes.length) {

        hashes = hashes.split('\n').reverse()

        for (var i = 0, l = hash.length; i < l; i++) {
          if (!startHash) return cb(null, hashes.slice(i))
          if (startHash == hashes[i]) startHash = false
        }
      }
      return cb('No commits found')
    })
  }