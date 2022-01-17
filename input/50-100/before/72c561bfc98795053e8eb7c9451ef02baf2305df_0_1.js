function() {
          app.helpers({
            compactJs: function() {
              return results;
            },
            compactJsHtml: function() {
              return results.map(function(filename) {
                return '<script src="' + filename + '"></script>';
              }).join('');
            }
          });
        }