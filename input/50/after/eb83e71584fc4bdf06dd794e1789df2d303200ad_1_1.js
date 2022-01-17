function(param) {
      param = param.split("=");
      queryParams[param[0]] = decodeURIComponent(param[1].replace(/\+/g,"%20"));
    }