function() {
      updateStatus("Fetching API List...");
	  var baseDiscoveryUrl = endsWith(discoveryUrl, "/") ? discoveryUrl.substr(0, discoveryUrl.length - 1) : discoveryUrl;
	  if(endsWith(baseDiscoveryUrl, "/resources.json"))
		baseDiscoveryUrl = baseDiscoveryUrl.substr(0, baseDiscoveryUrl.length - "/resources.json".length);
	  else if(endsWith(baseDiscoveryUrl, "/resources"))
		baseDiscoveryUrl = baseDiscoveryUrl.substr(0, baseDiscoveryUrl.length - "/resources".length);

	  this.discoveryUrlList.push(discoveryUrl);
	  this.discoveryUrlList.push(baseDiscoveryUrl);
	  this.discoveryUrlList.push(baseDiscoveryUrl + "/resources.json");
	  this.discoveryUrlList.push(baseDiscoveryUrl + "/resources");

	  log("Will try the following urls to discover api endpoints:")
	  for(var i = 0; i < this.discoveryUrlList.length; i++)
		log(" > " + this.discoveryUrlList[i]);

	  this.fetchEndpointsSeq();
    }