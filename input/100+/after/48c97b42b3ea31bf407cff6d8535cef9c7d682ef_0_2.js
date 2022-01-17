function(movieUrl, callback, movieInstance) {

      var iframe = doc.createElement('iframe');
      doc.documentElement.appendChild(iframe);
      var subWindow = iframe.contentWindow;
      var subMovie = movieInstance || new env.Movie();
      var subEnvironment = stage.getSubMovieEnvironment(subMovie, movieUrl);

      // Need to call open()/close() before exposing anything on the window
      // (Opera would initiate a separate script context if we did it after)
      subWindow.document.open();
      subWindow.document.close();

      // Expose bonsai on sub-movie:
      tools.mixin(subWindow, subEnvironment.exports);

      // Expose top-level plugin exports on every sub-movie:
      delete globalExports.stage; // don't allow anything to overwrite the bonsai stage
      tools.mixin(subWindow.bonsai, globalExports);
      tools.mixin(subWindow, globalExports);

      subWindow.stage = subMovie;
      subMovie.root = this;

      var subLoader = makeScriptLoader(function(url, cb) {
        var script = subWindow.document.createElement('script');
        script.src = url;
        script.onload = function() { cb(null); };
        script.onerror = function() { cb('Could not load: ' + url); };
        subWindow.document.documentElement.appendChild(script);
      });

      subLoader.load(stage.assetBaseUrl.resolveUri(movieUrl), function(err) {
        if (err) {
          callback.call(subMovie, err);
        } else {
          callback.call(subMovie, null, subMovie);
        }
      });

    }