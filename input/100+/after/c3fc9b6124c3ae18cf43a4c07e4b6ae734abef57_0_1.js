function(number, source) {
      var httpProxyUrlField      = this["$httpProxyUrlField" + number],
          targetInputField       = this["$targetInputField" + number],
          aggregateFunctionField = this["$aggregateFunctionField" + number],
          targetInput            = this["$targetInput" + number],
          metrics                = this["metricsCollection" + number];

      var sourceSupportsTarget   = function() {
        return (source === "demo" || source === "graphite");
      };

      if (source === "demo" || source === "graphite") {
        httpProxyUrlField.hide();
        targetInputField.show();
        aggregateFunctionField.show();
        if (metrics.source !== source) {
          targetInput.val("");
        }
        this.updateAutocompleteTargets(number);
      } else if (source === "http_proxy") {
        httpProxyUrlField.show();
        targetInputField.hide();
        aggregateFunctionField.hide();
      } else {
        httpProxyUrlField.hide();
        targetInputField.hide();
        aggregateFunctionField.hide();
      }
    }