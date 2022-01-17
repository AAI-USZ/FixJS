function makeURL(path) {
      if (baseURL == myOrigin)
        return path;
      path = baseURL + path;
      if (!jQuery.support.cors && window.console)
        window.console.warn("No CORS detected for request to " + path);
      return path;
    }