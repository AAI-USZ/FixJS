function(err, data) {
        console.log("retry #" + i)

        if (
          err
          && i < Request.prototype.maxRetries
          && (
            err.statusCode == 500 ||
            err.statusCode == 503 ||
            err.name.slice(-38) == "ProvisionedThroughputExceededException"
          )
        ) {
          setTimeout(retry, 50 << i, db, i + 1)
        }

        else cb(err, data)
      }