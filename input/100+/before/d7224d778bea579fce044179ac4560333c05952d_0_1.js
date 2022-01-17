function (err, result) {

    if (!validate.valid) {
      var e = { validate: validate, value: attrs, schema: that.schema };
      that.emit('error', e);
      if (callback) {
        callback(e);
      }
      return;
    }

    that.runAfterHooks("create", null, instance, function (e, res) {
      if (e) {
        return that.emit('error', e);
      }
      instance.save(function (e, res) {
        if (res) {
          instance._id  = instance._id  || res.id;
          instance._rev = instance._rev || res.rev;
        }
        if (callback) {
          callback(e, instance);
        }
      });
    });
  }