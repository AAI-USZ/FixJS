function(helper) {
              helper.compactJs()[0].should.match(/\-a.js$/);
              helper.compactJs()[1].should.match(/\-b.js$/);
              done();
            }