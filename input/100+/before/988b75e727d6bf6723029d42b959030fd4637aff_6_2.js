function (url, args, callback) {
    args = format_args(args);
    var process_data = args.process_data || true;
    if (args.content) {
      process_data = false;
      args.data = args.content;
    }
    $.ajax({
      url: url,
      type: args.type, 
      headers: args.headers || {}, 
      data: args.data, 
      processData: process_data,
      timeout: args.timeout, 
      dataType: 'text', 
      success: function (data, text_status, xhr) {
        callback(null, data, xhr);
      }, 
      error: function (xhr, text_status, err) {
        if (!err) {
          err = new Error(text_status);
          err.name = 'AjaxRequestError';
        }
        callback(err, null, xhr);
      }
    });
  }