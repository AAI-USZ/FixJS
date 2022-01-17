function(err, stdout, stderr) {
      var out = stdout.toString().split(/\n/)

      if (out.length) {
        var line, commit, commits = []
        for (var i = 0, l = out.length; i < l; i++) {
          line = out[0]
          // grab the hash and create a new Commit instance
          if (!line.indexOf('hash:')) { commits.unshift(commit = new Commit(line.substring(5))) }
          // grab the date and create a Date obj
          else if (!line.indexOf('date:')) { commit.timestamp = new Date(line.substring(5)) }
          // grab the message
          else if (!line.indexOf('mess:')) { commit.message = line.substring(5) }
          // detect the files list
          else if (!line.indexOf('file:')) {
            // loop through subsequent lines and add them to the files array
            for (; i < l && out[i+1]; i++) {
              commit.files.push(out[i])
            }
          }
        }
        return cb(null, commits)
      }
      return cb('No commits found')
    }