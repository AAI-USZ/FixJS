function handleProxyIDP() {
    if (config.has('proxy_idps')) {
      var proxyIDPs = config.get('proxy_idps');
      if (proxyIDPs.hasOwnProperty(domain)) {
        var generatedBody = JSON.stringify({
          authority: proxyIDPs[domain]
        });
        cb(null, generatedBody, domain, delegates);
      } else {
        cb(null, false, null);
      }
    } else {
      cb(null, false, null);
    }
  }