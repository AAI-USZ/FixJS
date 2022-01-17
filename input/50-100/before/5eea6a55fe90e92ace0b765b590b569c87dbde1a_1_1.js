function handleProxyIDP() {
    var proxyIDPs = config.get('proxy_idps');

    if (proxyIDPs.hasOwnProperty(domain)) {
      var generatedBody = JSON.stringify({
        authority: proxyIDPs[domain]
      });
      cb(null, generatedBody, domain, delegates);
    } else {
      cb(null, false, null);
    }
  }