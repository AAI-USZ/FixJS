function(){

    it ("decorates every request object with the Router object as req.detour by default", 
        function(){
          var d = new Router();
          d.route('/', { POST : function(req, res){return "POST";}});
          var req = { url : "http://asdf.com/", method : "POST"};
          d.dispatch(req, this.res);
          should.exist(req.detour);
        }
    );
    it ("decorates req with the Router object as req[d.requestNamespace]",
        function(){
          var d = new Router();
          d.requestNamespace = "router";
          d.route('/', { POST : function(req, res){return "POST";}});
          var req = { url : "http://asdf.com/", method : "POST"};
          d.dispatch(req, this.res);
          should.exist(req.router);
        }
    );

    it ("404s when it doesn't find a matching route and shouldHandle404s is true", function(){
      var d = new Router();
      var req = {url : "http://asdf.com/", method : 'GET'};
      d.dispatch(req, this.res);
      this.res.status.should.equal(404);
      this.res.body.should.equal('');
    });
    it ("calls next() when it doesn't find a matching route and shouldHandle404s is false", function(){
      var d = new Router();
      d.shouldHandle404s = false;
      var req = {url : "http://asdf.com/", method : 'GET'};
      var success = false;
      function next(){success = true;}
      d.dispatch(req, this.res, next);
      this.res.body.should.equal('');
      success.should.equal(true);
    });

    it ("414s if the url is too long", function(){
      var d = new Router();
      var simpleModule = this.simpleModule;
      var bigurl = "1";
      _.times(4097, function(){bigurl += '1';});
      d.route('/', simpleModule);
      var req = { url : bigurl, method : "PUT"};
      d.dispatch(req, this.res);
      this.res.expectStatus(414);
    });

    it ("405s on a resource-unsupported method", function(){
      var d = new Router();
      var simpleModule = this.simpleModule;
      d.route('/', simpleModule);
      d.route('/hello', { GET : function(req, res){res.send("hello world");}});
      var req = { url : "http://asdf.com/hello", method : "PUT"};
      d.dispatch(req, this.res);
      this.res.expectStatus(405);
      this.res.expectHeader('Allow', 'OPTIONS,GET,HEAD');
    });
    it ("500s on a directly thrown exception", function(){
      var d = new Router();
      var simpleModule = this.simpleModule;
      d.route('/', simpleModule);
      d.route('/fail', { GET : function(req, res){ throw 'wthizzle';}});
      var req = { url : "http://asdf.com/fail", method : "GET"};
      d.dispatch(req, this.res);
      this.res.expectStatus(500);
    });

    it ("501s on a server-unsupported method", function(){
      var d = new Router();
      var simpleModule = this.simpleModule;
      d.route('/', simpleModule);
      d.route('/hello', { GET : function(req, res){res.send("hello world");}});
      var req = { url : "http://asdf.com/hello", method : "TRACE"};
      d.dispatch(req, this.res);
      this.res.expectStatus(501);
    });
    it ("can route an object with a POST", function(){
        var d = new Router();
        d.route('/', { POST : function(req, res){res.end("POST");}});
        var req = { url : "http://asdf.com/", method : "POST"};
        d.dispatch(req, this.res);
        this.res.expectEnd("POST");
    });

    describe("when the method is HEAD", function(){
      // HEAD is the same as GET, but without a response body
      // It should call resource's GET or collectionGET, strip the body, and
      // return the rest.
      it ("404s if the resource doesn't exist", function(){
          var d = new Router();
          var req = { url : "http://asdf.com/asdf", method : "OPTIONS"};
          d.dispatch(req, this.res);
          this.res.expectStatus(404);
      });
      it ("405s if the resource has no GET", function(){
          var d = new Router();
          d.route('/', { POST : function(req, res){return "POST";}});
          var req = { url : "http://asdf.com/", method : "HEAD"};
          d.dispatch(req, this.res);
          this.res.expectStatus(405);
      });
      it ("204s (no body) if the resource has a GET", function(){
          var d = new Router();
          d.route('/', { GET : function(req, res){
                              res.setHeader("Content-Type", 'application/wth');
                              res.end("GET output");
                        }});
          var req = { url : "http://asdf.com/", method : "HEAD"};
          try {
            d.handle500 = function(req, res, ex){
              console.log(ex);
            };
            d.dispatch(req, this.res);
          } catch (ex){
            console.log(ex);
          }
          this.res.expectStatus(204);
          this.res.expectHeader("Content-Type", 'application/wth');
      });
    });

    describe ("when the method is OPTIONS", function(){
      it ("404s if the resource doesn't exist", function(){
          var d = new Router();
          var req = { url : "http://asdf.com/asdf", method : "OPTIONS"};
          d.dispatch(req, this.res);
          this.res.expectStatus(404);
      });
      it ("sets the proper headers for OPTIONS if the resource exists", function(){
          var d = new Router();
          d.route('/', { GET : function(req, res){
                              res.end("GET output");
                        }});
          var req = { url : "http://asdf.com/", method : "OPTIONS"};
          d.dispatch(req, this.res);
          this.res.expectStatus(204);
          this.res.expectHeader('Allow', 'OPTIONS,GET,HEAD');
      });
    });
    it ("finds and runs a GET handler at a sub path", function(){
          var d = new Router();
          d.route('/', { GET : function(req, res){
                              res.end("GET output");
                        }});
          d.route('/subpath', { 
                              GET : function(req, res){
                                res.end("GET output 2");
                              },
                              DELETE : function(req, res){
                                res.end("delete");
                              }
                            });
          var req = { url : "http://asdf.com/subpath", method : "OPTIONS"};
          d.dispatch(req, this.res);
          this.res.expectStatus(204);
          this.res.expectHeader('Allow', 'OPTIONS,DELETE,GET,HEAD');
    });

  }