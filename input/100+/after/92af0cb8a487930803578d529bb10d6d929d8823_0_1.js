function(er, stat) {
    if (er) {
      that.emit('error', er, entry, stat)
      that.doneOne()
      return
    }

    if (!that._filter(entry, stat)) {
       console.log("filtered", entry, stat);
      that.doneOne();
      return
    } 

    if (stat.isDirectory()) {
      if (!that._filterDir(entry, stat)) {
        console.log('filterDir deprecated. Use filter(entry, stat) instead.');
        that.doneOne();
      } else {
        fs.readdir(entry, function(er, files) {
          if (er) {
            that.emit('error', er, entry, stat)
            that.doneOne()
            return
          }

          that.emit('entry', entry, stat)
          that.emit('dir', entry, stat)
          files.forEach(function(part) {
            that.go(path.join(entry, part))
          })
          that.doneOne()
        })
      }
    } else if (stat.isSymbolicLink()) {
      that.emit('entry', entry, stat)
      that.emit('symlink', entry, stat)
      that.doneOne()
    } else if (stat.isBlockDevice()) {
      that.emit('entry', entry, stat)
      that.emit('blockDevice', entry, stat)
      that.doneOne()
    } else if (stat.isCharacterDevice()) {
      that.emit('entry', entry, stat)
      that.emit('characterDevice', entry, stat)
      that.doneOne()
    } else if (stat.isFIFO()) {
      that.emit('entry', entry, stat)
      that.emit('fifo', entry, stat)
      that.doneOne()
    } else if (stat.isSocket()) {
      that.emit('entry', entry, stat)
      that.emit('socket', entry, stat)
      that.doneOne()
    } else if (stat.isFile()) {
      that.emit('entry', entry, stat)
      that.emit('file', entry, stat)
      that.doneOne()
    } else {
      that.emit('error', UnknownFileTypeError(), entry, stat)
      that.doneOne()
    }
  }