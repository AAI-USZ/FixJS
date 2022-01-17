function(event) {
      var that    = this,
          source  = this.$sourceSelect.val(),
          options = { suppressErrors: true };

      if (source === "demo" || source === "graphite") {
        this.$httpProxyUrlField.hide();
        this.$targetInputField.show();
        if (collections.metrics.source !== source) {
          this.$targetInput.val("");
        }

        collections.metrics.source = source;
        collections.metrics.fetch(options)
        .done(function() {
          that.$targetInput.select2({ tags: collections.metrics.autocomplete_names(), width: "17em" });
        })
        .error(this.showConnectionError);
      } else if (source === "http_proxy") {
        this.$targetInputField.hide();
        this.$httpProxyUrlField.show();
      }
    }