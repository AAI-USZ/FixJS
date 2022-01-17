function(apiObjects, basePath) {
      // log("apiObjects: %o", apiObjects);
      this.apiList.createAll(apiObjects);
	  this.apiList.each(function(api) {
		api.setBaseUrl(basePath);
	  });
    }