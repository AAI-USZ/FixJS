function makeScratchProxy(proxy) {
    var vv = proxy.unwrap();
    proxy.validate = new ValidatorFactory(vv.translateFrom.validators, vv.translateTo.validators);
    return proxy;
  }