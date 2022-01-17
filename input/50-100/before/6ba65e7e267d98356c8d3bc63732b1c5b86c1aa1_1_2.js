function(number) {
      var metrics = this["metricsCollection" + number];
      metrics.source = this.$sourceSelect1.val();
      metrics.fetch({ success: _.bind(function() {
        this["$targetInput" + number].select2({ tags: metrics.autocomplete_names(), width: "17em" });
      }, this)});
    }