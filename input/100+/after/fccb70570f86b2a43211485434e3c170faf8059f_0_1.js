function (error, stat) {
      if (error) return callback(error, null);
      ret.mtime = stat.mtime;
      ret.size = stat.size;
      ret.content = new Buffer(stat.size);

      if (stat.size === 0) {
        return callback(null, ret);
      }

      fs.read(fd, ret.content, 0, stat.size, 0, function (error) {
        if (error) {
          console.log(stack);
          return callback(error, null);
        }

        fs.close(fd, function () {
          callback(null, ret);
        });
      });
    }