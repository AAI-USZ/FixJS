function(number, source) {
      var httpProxyUrlField      = this["$httpProxyUrlField" + number],
          targetInputField       = this["$targetInputField" + number],
          aggregateFunctionField = this["$aggregateFunctionField" + number],
          targetInput            = this["$targetInput" + number],
          metrics                = this["metricsCollection" + number];

      var sourceSupportsTarget   = function(source) {
        return (source === "demo" || source === "graphite");
      };

      if (sourceSupportsTarget(source)) {
        httpProxyUrlField.hide();
        targetInputField.show();
        aggregateFunctionField.show();
        if (metrics.source !== source) {
          targetInput.val("");
        }
        this.updateAutocompleteTargets(number);
      } else {
        httpProxyUrlField.show();
        targetInputField.hide();
        aggregateFunctionField.hide();
      }
    }