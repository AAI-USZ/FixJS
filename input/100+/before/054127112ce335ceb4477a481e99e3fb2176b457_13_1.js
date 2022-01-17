function chown (er) {
            if (er) return cb(er)
            var mode = stat.isDirectory() ? dMode : fMode
              , oldMode = stat.mode & 0777
              , newMode = (oldMode | mode) & (~npm.modes.umask)
            if (mode && newMode !== oldMode) {
              log.silly(newMode.toString(8), "chmod "+path.basename(f))
              fs.chmod(f, newMode, cb)
            } else cb()
          }