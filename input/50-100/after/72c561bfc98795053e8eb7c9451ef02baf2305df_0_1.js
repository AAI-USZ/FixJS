function(error, results) {
        if (error) {
          return next(error);
        }

        res.locals({
          compactJs: function () {
            return results;
          },
          compactJsHtml: function() {
            return results.map(function(filename) {
              return '<script src="' + filename + '"></script>';
            }).join('');
          }
        });

        next();
      }