function(first, second) {
      var resp = first === model ? second : first;
      if (onError) {
        onError(model, resp, options);
      } else {
        model.trigger('error', model, resp, options);
      }
    }