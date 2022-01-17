function() {
      var baseUrl = "/";
      var apiKey = "";
      var privateKey = jQuery.trim($("#input_privateKey").val());
      var clientKey = jQuery.trim($("#input_clientKey").val());
      if (baseUrl.length == 0) {
        $("#input_baseUrl").wiggle();
      } else {
        if (this.supportsLocalStorage()) {
          localStorage.setItem("com.wordnik.swagger.ui.privateKey", privateKey);
          localStorage.setItem("com.wordnik.swagger.ui.clientKey", clientKey);
          localStorage.setItem("com.wordnik.swagger.ui.baseUrl", baseUrl);
        }
        var resourceListController = ResourceListController.init({
          baseUrl: baseUrl,
          apiKey: apiKey
        });
      }
    }