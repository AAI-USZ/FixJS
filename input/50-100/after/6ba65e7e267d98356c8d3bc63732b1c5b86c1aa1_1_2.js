function(number) {
      var metrics = this["metricsCollection" + number],
          source  = this["$sourceSelect" + number].val(),
          options = { suppressErrors: true };
      metrics.source = source;
      metrics.fetch(options)
        .done(_.bind(function() {
          this["$targetInput" + number].select2({ tags: metrics.autocomplete_names(), width: "17em" });
        }, this))
        .error(this.showConnectionError);
    }