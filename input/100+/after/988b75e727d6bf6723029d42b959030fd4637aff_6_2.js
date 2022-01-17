function (url, args, callback) {
    args = format_args(args);
    var processData = args.process_data || args.processData || true;
    if (args.content) {
      processData = false;
      args.data = args.content;
    }
    var dataType = args.dataType || 'text';
    $.ajax({
      url: url,
      type: args.type, 
      headers: args.headers || {}, 
      data: args.data, 
      processData: processData,
      timeout: args.timeout, 
      dataType: dataType, 
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