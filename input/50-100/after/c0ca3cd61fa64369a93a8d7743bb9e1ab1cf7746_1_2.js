function(helper) {
              var c = helper.compactJs();
              c[0].should.match(/\-large.js$/);
              c[1].should.match(/\-a.js$/);
              c[2].should.match(/\-b.js$/);
              c[3].should.match(/\-c.js$/);
            }