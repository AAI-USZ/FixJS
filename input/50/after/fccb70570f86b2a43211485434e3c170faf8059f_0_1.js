function (error) {
        if (error) {
          console.log(stack);
          return callback(error, null);
        }

        fs.close(fd, function () {
          callback(null, ret);
        });
      }