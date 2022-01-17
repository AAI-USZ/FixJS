function(response) {
			  var baseUrl = response.basePath;
		      if(baseUrl.substr(baseUrl.length - 1) === "/"){
		      	baseUrl = baseUrl.substr(0, baseUrl.length - 1)
		      }
  		      log("Setting globalBasePath to " + baseUrl);
		      globalBasePath = baseUrl;
		      ApiResource.createAll(response.apis);
	          controller.fetchResources(globalBasePath);
	      }