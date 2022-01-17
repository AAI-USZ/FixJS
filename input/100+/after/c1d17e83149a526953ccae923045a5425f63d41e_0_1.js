function(uri) {
      var script = document.createElement('script');
      var load_callback = function() {
        JX.Resource._complete(uri);
      };
      var error_callback = function() {
        JX.$E('Resource: JS file download failure: ' + uri);
      };

      JX.copy(script, {
        type: 'text/javascript',
        src: uri
      });

      script.onload = load_callback;
      script.onerror = error_callback;
      script.onreadystatechange = function() {
        var state = this.readyState;
        if (state == 'complete' || state == 'loaded') {
          callback();
        }
      };
      document.getElementsByTagName('head')[0].appendChild(script);
    }