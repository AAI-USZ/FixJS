function(done){        
      var client = new Client(), 
          s1 = {url:'/test1.js', weight:10},
          s2 = {url:'/test2.js', weight:-10};
          
      client.addScript(s1);
      client.addScript(s2);

      client.listScripts(function(err, scripts) {
        should.not.exist(err);
        scripts.should.include('<script title="/test2.js" src="/test2.js"></script>\r\n<script title="/test1.js" src="/test1.js">');
        done();
      })

    }