function() {
      conf.set('test:v1','v1');
      conf.get('test:v1').should.equal('v1');
      conf.set('test:v2','v2');
      conf.get('test:v2').should.equal('v2');
  
      var test = conf.get('test');
      test.v1.should.equal('v1');
      test.v2.should.equal('v2');
    }