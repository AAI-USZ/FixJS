function(done){
      var client = new Client(),
          s1 = {url:'/test1.css', weight:10},
          s2 = {url:'/test2.css', weight:-10};

      client.addStyle(s1);
      client.addStyle(s2);

      client.listStyles(function(err, styles) {
        should.not.exist(err);
        styles.should.match(/<link rel=\"stylesheet\" title=\"\/test2\.css\" href=\"\/test2\.css\"\/>\r\n<link rel=\"stylesheet\" title=\"\/test1\.css\" href=\"\/test1\.css\"\/>/);
        done();
      })

    }