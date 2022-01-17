function getParam(key) {
      return isDefined(params[key]) ? params[key] : params[key + 's'];
    }