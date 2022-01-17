function webfinger(urlObj, res) {
    if(urlObj.query['resource']) {
      userAddress = urlObj.query['resource'].substring('acct:'.length);
      userName = userAddress.split('@')[0];
    }
    writeJson(res, {
      links:[{
        href: config.protocol+'://'+config.host+'/storage/'+userName+'/',
        rel: "remoteStorage",
        type: "https://www.w3.org/community/rww/wiki/read-write-web-00#simple",
        properties: {
          'auth-method': "https://tools.ietf.org/html/draft-ietf-oauth-v2-26#section-4.2",
          'auth-endpoint': config.protocol+'://'+config.host+'/auth/'+userName+'/'
        }
      }]
    });
  }