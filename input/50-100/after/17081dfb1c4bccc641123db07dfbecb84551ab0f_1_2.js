function (err, data) {
        var o_id = m.ObjectID.createFromHexString(id);
        data.findOne({_id: o_id}, function (err, result) {
          console.log(err);
          console.log(result);
          callback(result);
        });
      }