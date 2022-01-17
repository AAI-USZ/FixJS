function (err, data, res) {
    if (err) {
      return format_result(args, err, res, callback, context);
    }
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(data)) {
      data = data.toString();
    }
    format_result(args, data, res, callback, context);
  }