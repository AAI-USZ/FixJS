function(step) {
      var stateData = {};
      // var title = $("title").text();
      var $step = this._stepElement(step);
      var title = $step.data("page-title");
      var currentState = History.getState();
      var currentStep = this.currentStep;
      var urlPathComponents = currentState.url.split("/");
      var newUrlPathComponents = [];
      var newUrl;
      var i;
      var lastIndex = urlPathComponents.length - 1;

      for (i=3; i<lastIndex; i++) {
        if (urlPathComponents[i] !== "") {
          newUrlPathComponents.push(urlPathComponents[i]);
        }
      }

      // remove any query params from the end of the URL
      lastPathComponent = urlPathComponents[lastIndex].split("?")[0];

      if (lastPathComponent !== currentStep) {
        newUrlPathComponents.push(lastPathComponent);
      }

      newUrlPathComponents.push(step);
      newUrl = "/" + newUrlPathComponents.join("/");
      stateData["step"] = step;

      History.pushState(stateData, title, newUrl);

      // for older browsers that don't respect pushState's title arg
      if ($("title").text() !== title) {
        $("title").text(title);
      }
    }