function(){
      if (xhr.readyState == 4) {
        clearTimeout(abortTimeout);
        var result, error = false;
        if ((xhr.status >= 200 && xhr.status < 300) || (xhr.status == 0 && protocol == 'file:')) {
          if (mime == 'application/json' && !(/^\s*$/.test(xhr.responseText))) {
            try { result = JSON.parse(xhr.responseText); }
            catch (e) { error = e; }
          }
          else result = xhr.responseText;
          if (error) ajaxError(error, 'parsererror', xhr, settings);
          else ajaxSuccess(result, xhr, settings);
        } else {
          ajaxError(null, 'error', xhr, settings);
        }
      }
    }