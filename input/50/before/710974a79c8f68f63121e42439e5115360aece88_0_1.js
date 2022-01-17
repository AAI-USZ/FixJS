function (err, data) {
            self._addData(data);
            callback.apply(null, [err].concat(scopedModels));
          }