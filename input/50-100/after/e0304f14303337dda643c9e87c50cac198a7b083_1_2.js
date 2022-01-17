function () {
      conf.setSave('test:setsave','Yah!',function(err) {
          var confTest = new Config({path:path.join(rootpath,'tmp')});
          confTest.init(function () {
            confTest.get('test:setsave').should.equal('Yah!');
          });
      });
    }