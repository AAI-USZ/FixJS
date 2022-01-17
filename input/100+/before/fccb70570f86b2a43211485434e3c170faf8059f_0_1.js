function (error) {
        if (error) return callback(error, null);

        fs.close(fd, function () {
          callback(null, ret);
        });
      }