function symlinkNodeBinding () {
    var source, target
    var buildDir = path.join('build', buildType, '*.node')
    log.verbose('globbing for files', buildDir)
    glob(buildDir, function (err, nodeFiles) {
      if (err) return callback(err)
      function link () {
        var file = nodeFiles.shift()
        if (!file) {
          // no more files to link... done!
          return callback()
        }
        if (win) {
          // windows requires absolute paths for junctions
          source = path.resolve('build', path.basename(file))
          target = path.resolve(file)
        } else {
          // on unix, use only relative paths since they're nice
          source = path.join('build', path.basename(file))
          target = path.relative('build', file)
        }
        log.info('symlink', 'creating %s "%s" pointing to "%s"', win ? 'junction' : 'symlink', source, target)
        fs.symlink(target, source, 'junction', function (err) {
          if (err) {
            if (err.code === 'EEXIST') {
              log.verbose('destination already exists; deleting', dest)
              rm(dest, function (err) {
                if (err) return callback(err)
                log.verbose('delete successful; trying symlink again')
                nodeFiles.unshift(file)
                link()
              })
            } else {
              callback(err)
            }
            return
          }
          // process the next file, if any
          link()
        })
      }
      // start linking
      link()
    })
  }