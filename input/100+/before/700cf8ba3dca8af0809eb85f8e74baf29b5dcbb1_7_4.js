function isArray(proxy) {
    return hd.isProxy(proxy) && Array.isArray(proxy.unwrap().value);
  }