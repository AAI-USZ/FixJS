function(options){
    var callbackName = 'jsonp' + (++jsonpID),
      script = document.createElement('script'),
      abort = function(){
        $(script).remove();
        if (callbackName in window) window[callbackName] = empty;
        ajaxComplete(xhr, options, 'abort');
      },
      xhr = { abort: abort }, abortTimeout;

    window[callbackName] = function(data){
      clearTimeout(abortTimeout);
      $(script).remove();
      delete window[callbackName];
      ajaxSuccess(data, xhr, options);
    };

    script.src = options.url.replace(/=\?/, '=' + callbackName);
    $('head').append(script);

    if (options.timeout > 0) abortTimeout = setTimeout(function(){
        xhr.abort();
        ajaxComplete(xhr, options, 'timeout');
      }, options.timeout);

    return xhr;
  }