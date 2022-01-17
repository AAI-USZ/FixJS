function(){
    it('should match based on index', function(){
      router.route('get', '/foo', function(){});
      router.route('get', '/foob?', function(){});
      router.route('get', '/bar', function(){});
      var method = 'GET'
        , url = '/foo?bar=baz';

      var route = router.match(method, url, 0);
      route.constructor.name.should.equal('Route');
      route.method.should.equal('get');
      route.path.should.equal('/foo');

      var route = router.match(method, url, 1);
      route.path.should.equal('/foob?');

      var route = router.match(method, url, 2);
      assert(!route);

      url = '/bar';
      var route = router.match(method, url);
      route.path.should.equal('/bar');
    })
  }