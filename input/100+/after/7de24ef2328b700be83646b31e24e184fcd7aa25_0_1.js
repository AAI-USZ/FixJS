function(step) {
      var stateData = {};
      var title = $("title").text();
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

      if (urlPathComponents[lastIndex] !== currentStep) {
        newUrlPathComponents.push(urlPathComponents[lastIndex]);
      }

      newUrlPathComponents.push(step);
      newUrl = "/" + newUrlPathComponents.join("/");
      stateData["step"] = step;

      History.pushState(stateData, title, newUrl);
    }