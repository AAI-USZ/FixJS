function(){
        $(script).remove();
        if (callbackName in window) window[callbackName] = empty;
        ajaxComplete(xhr, options, 'abort');
      }