function (data) {
      _reset.call(_this, index, data.result);
      if (!options) return;
      $.isFunction(options.success) && options.success();
    }