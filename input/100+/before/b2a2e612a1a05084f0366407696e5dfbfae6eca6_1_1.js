function(){
    it ("when accessing an undefined url, throws an exception",
      function(){
        var d = new Router();
        expectException(function(){
          d.getHandler('/');
        }, "404", "Not Found", "/");
      }
    );
    it ("when accessing a too-long url, throws an exception", function(){
      var d = new Router();
      var simpleModule = this.simpleModule;
      var bigurl = "1";
      _.times(4097, function(){bigurl += '1';});
      expectException(function(){
        d.getHandler(bigurl);
      }, "414", "Request-URI Too Long", {});
    });
    it ("when accessing a defined url, returns a handler",
      function(){
        var d = new Router();
        d.route('/', function(req, res){ res.send("hello world");});
        var handler = d.getHandler('/');
        should.exist(handler.GET);
      }
    );
  }