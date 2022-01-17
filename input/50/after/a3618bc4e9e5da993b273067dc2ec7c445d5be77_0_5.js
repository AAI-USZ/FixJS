function(err, tree) {
          if (err) {
            throw err;
          }
          return result = tree.toCSS({
            compress: compress
          });
        }