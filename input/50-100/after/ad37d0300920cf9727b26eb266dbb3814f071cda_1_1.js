function () {
      confTest.set('test:v1','v1');
      confTest.get('test:v1').should.equal('v1');
      confTest.save(function(err) {
          (fs.existsSync || path.existsSync)(confTest.file);
      });
    }