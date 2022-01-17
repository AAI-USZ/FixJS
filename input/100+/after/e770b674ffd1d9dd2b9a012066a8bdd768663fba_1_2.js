function(){
      router.route('get', '/foo', function(){});
      router.route('get', '/foob?', function(){});
      router.route('get', '/bar', function(){});
      var req = { method: 'GET', url: '/foo?bar=baz' };

      var route = router.matchReq(req, 0);
      route.constructor.name.should.equal('Route');
      route.method.should.equal('get');
      route.path.should.equal('/foo');

      var route = router.matchReq(req, 1);
      req._route_index.should.equal(1);
      route.path.should.equal('/foob?');

      var route = router.matchReq(req, 2);
      assert(!route);

      req.url = '/bar';
      var route = router.matchReq(req);
      route.path.should.equal('/bar');
    }