function (err, data) {
        console.log('collection error');
        console.log(err);
        var o_id = m.ObjectID.createFromHexString(id);
        data.findOne({_id: o_id}, function (err, result) {
          console.log(err);
          console.log(result);
          callback(result);
        });
      }