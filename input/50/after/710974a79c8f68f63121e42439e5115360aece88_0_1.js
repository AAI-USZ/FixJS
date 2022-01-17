function (err, data) {
            if (!err) self._addData(data);
            callback.apply(null, [err].concat(scopedModels));
          }