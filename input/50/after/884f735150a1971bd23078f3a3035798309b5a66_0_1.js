function(apiObjects, basePath) {
      log("apiObjects: %o", basePath);
      this.apiList.createAll(apiObjects);
	  this.apiList.each(function(api) {
		api.setBaseUrl(basePath);
	  });
    }