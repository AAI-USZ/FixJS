function(text) {
        text.should.eql("\n" + '     #1  \u001b[31m✖\u001b[39m  Foo' + "\n");
        console.log.restore();
        done();
      }