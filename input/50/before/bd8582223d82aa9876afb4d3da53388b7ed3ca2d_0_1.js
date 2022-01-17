function(result) {
            if (typeof result != "undefined" && typeof result.Errors != "undefined"){
              callback(new Error(result.Errors.Error.Message), result)
            } else {
              callback(null, result)
            }
          }