function(requestId, name, args, callback) {
  var that = this;

  var body = {
    jsonrpc: "2.0",
    method: name
  };
  if (args) {
    body.params = args;
  }
  if (requestId) {
    body.id = requestId;
  }

  var ajaxSettings = {
    type:'POST',
    cache: false,
    data: JSON.stringify(body),
    dataType: "json",
    processData: false,
    contentType: 'application/json; charset=utf-8',
    success: function(data, textStatus, jqXHR) {
      var errorHandled, error;

      if(that.aborted)
        return;

      if (data === undefined) {
        error = {'message': 'Empty response'};
        errorHandled = callback ? callback(error) : false;
        if (!errorHandled) {
          BUS.fire('rpc.error', {
            request: body,
            error: error
          });
        }
      }
      else if (data.error) {
        errorHandled = callback ? callback(data.error) : false;
        if (!errorHandled) {
          BUS.fire('rpc.error', {
            request: body,
            error: data.error
          });
        }
      } else {
        if (callback) {
          callback(undefined, data.result);
        }
      }
    }
  };

  ajaxSettings.error = function(jqXHR, textStatus, errorThrown) {
    if (that.aborted)
      return;

    var errorObj = {type: 'connectionerror', text: textStatus, error: errorThrown};
    var errorHandled = callback ? callback(errorObj) : false;
    if (!errorHandled) {
      BUS.fire('rpc.connectionerror', errorObj);
    }
  };

  var req = $.ajax(this.url, ajaxSettings).always(function() {
    that.stateWaiting = jQuery.grep(that.stateWaiting, function(areq, i) {
      return areq !== req;
    });
    BUS.fire('rpc.queue.length', that.stateWaiting.length);
  });
  this.stateWaiting.push(req);
  BUS.fire('rpc.queue.length', this.stateWaiting.length);
}