function(data, xhr, response) {
    var out = {};
    if (data.success || data.errors || data.meta || data.result) {
      if (data.count != null) response.count = data.count;
      if (!isEmptyObject(data.success)) out.success = data.success;
      if (!isEmptyObject(data.meta)) out.meta = data.meta;
      if (!isEmptyObject(data.result)) out.result = data.result;
      if (!isEmptyObject(data.errors)) {
        out.errors = {};
        for (var k in data.errors) {
          var error = data.errors[k];
          if (!out.errors[error.code]) out.errors[error.code] = {}
          out.errors[error.code][k] = {errors: [ error ]};
        }
      }

      // At least guarantee a success callback.
      if (isEmptyObject(out)) {
        if (this.config.options && this.config.options.snippet) out.result = {};
        else out.success = {};
      }
    } else {
      // Non-standard response. Just pass back the data we were given.
      out = {success: data};
    }

    return out;
  }