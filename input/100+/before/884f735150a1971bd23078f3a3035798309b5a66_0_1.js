f      var formValuesMap = new Object();
      for (var i = 0; i < formValues.length; i++) {
        var formValue = formValues[i];
        if (formValue.value && jQuery.trim(formValue.value).length > 0)
        formValuesMap[formValue.name] = formValue.value;
      }

      var urlTemplateText = this.path_json.replace(/\*/g, "").split("{").join("${");
      // log("url template = " + urlTemplateText);
      var urlTemplate = $.template(null, urlTemplateText);
      var url = $.tmpl(urlTemplate, formValuesMap)[0].data;
      // log("url with path params = " + url);
      var headers = {};
      var queryParams = {};
      if (apiKey) {
        apiKey = jQuery.trim(apiKey);
        if (apiKey.length > 0)
        queryParams['api_key'] = apiKey;
      }

      this.parameters.each(function(param) {
        var paramValue = jQuery.trim(formValuesMap[param.name]);
        if (param.paramType == "query" && paramValue.length > 0) {
            queryParams[param.name] = formValuesMap[param.name];
        } else if (param.paramType == "body" && paramValue.length > 0) {
            // according to spec One and only one input object is supplied
            queryParams = formValuesMap[param.name];
        } else if (param.paramType == "header") {
            headers[param.name] = formValuesMap[param.name];
        }
      });

      this._queryParams = queryParams;
      this._headers = headers;

      var baseUrl = location.protocol + "//" + location.host + "/Billing";
      if(location.hostname == "localhost" && location.port == 4567){
        baseUrl = "https://stage-api.dynabic.com/Billing";
      }

      url = baseUrl + url;
      // log("final url with query params and base url = " + url);

      return url;
    },
