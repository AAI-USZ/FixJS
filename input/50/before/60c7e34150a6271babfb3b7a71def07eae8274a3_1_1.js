function() {

        fs.readFile(destPath + '/global.js', function(error, data) {
         // data.toString().should.equal('var a=1;a=10;var b=3,c=5');
          done();
        });
      }