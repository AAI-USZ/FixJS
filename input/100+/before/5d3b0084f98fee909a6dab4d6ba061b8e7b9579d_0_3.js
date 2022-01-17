function (err, stat) {
      var entry = {
        name: file
      };

      if (err) {
        entry.err = err.stack || err;
        return callback(entry);
      } else {
        entry.access = stat.access;
        entry.size = stat.size;
        entry.mtime = stat.mtime.valueOf();

        if (stat.isDirectory()) {
          entry.mime = "inode/directory";
        } else if (stat.isBlockDevice()) entry.mime = "inode/blockdevice";
        else if (stat.isCharacterDevice()) entry.mime = "inode/chardevice";
        else if (stat.isSymbolicLink()) entry.mime = "inode/symlink";
        else if (stat.isFIFO()) entry.mime = "inode/fifo";
        else if (stat.isSocket()) entry.mime = "inode/socket";
        else {
          entry.mime = getMime(fullpath);
        }

        if (!stat.isSymbolicLink()) {
          return callback(entry);
        }
        fs.readlink(fullpath, function (err, link) {
          if (err) {
            entry.linkErr = err.stack;
            return callback(entry);
          }
          entry.link = link;
          realpath(resolve(dirname(fullpath), link), function (err, newpath) {
            if (err) {
              entry.linkStatErr = err;
              return callback(entry);
            }
            createStatEntry(basename(newpath), newpath, function (linkStat) {
              entry.linkStat = linkStat;
              linkStat.fullPath = newpath.substr(base.length) || "/";
              return callback(entry);
            });
          }, true/*alreadyRooted*/);
        });
      }
    }