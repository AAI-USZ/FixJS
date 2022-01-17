function ($) {
      var errorsLoaded,
          typekitFinished;

      function startLoad() {
        errorsLoaded = $.Deferred();
        typekitFinished = $.Deferred();

        try {
          Typekit.load({
            active: finishTypekit,
            inactive: finishTypekit
          });
        } catch(e) { typekitFinished.resolve(); }

        $.loadErrors("slowparse/spec/", ["base", "forbidjs"], function() {
          errorsLoaded.resolve();
        });
      }

      if (config.isBuild) {
        onLoad(startLoad.toString());
      } else {
        startLoad();
        $.when(errorsLoaded, typekitFinished).then(onLoad);
      }
    }