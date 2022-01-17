function(){
      expect(middlewares.ensureHttps).to.be.a('function');
      expect(middlewares.ensureHttps.replaceProtocol).to.be.a('function');
      expect(ensureHttps).to.be.a('function');
    }