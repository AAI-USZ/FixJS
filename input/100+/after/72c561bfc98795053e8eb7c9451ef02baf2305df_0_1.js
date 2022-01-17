function middleware() {

    if (arguments.length === 0) {
      throw new Error('You must pass one or more arrays containing valid namespace names');
    }

    var namespaceGroups = Array.prototype.slice.call(arguments);

    return function(req, res, next) {
      processNamespaceGroups(namespaceGroups, function(error, results) {
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
      });
    };
  }