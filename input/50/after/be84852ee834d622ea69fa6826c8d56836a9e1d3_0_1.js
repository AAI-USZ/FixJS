function(result) {
          if (result && typeof result.Errors !== 'undefined') {
            callback(result.Errors.Error.Message, result, res);
          } else {
            callback(null, result, res);
          }
        }