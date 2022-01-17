function (err, data) {
          console.log(err);
        data.insert(me.attributes, function(error, results) {
          console.log(error);
          console.log(results);
          callback(error, results);
        });
      }