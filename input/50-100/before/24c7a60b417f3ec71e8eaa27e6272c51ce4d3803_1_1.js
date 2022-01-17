function(err, assertion) {
        if (err) cb(err);
        else {
          cb(null, {
            audience: obj.audience,
            assertion: assertion,
            expirationDate: expirationDate
          });
        }
      }