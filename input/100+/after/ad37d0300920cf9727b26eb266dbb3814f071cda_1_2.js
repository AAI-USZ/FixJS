function () {
      confDev.set('test:v1','v1');
      confDev.get('test:v1').should.equal('v1');
      confDev.save(function(err) {
          (fs.existsSync || path.existsSync)(confDev.file);
      });
    }