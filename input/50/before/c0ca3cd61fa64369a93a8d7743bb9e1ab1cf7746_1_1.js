function(helper) {
              helper.compactJs().should.eql(['/a.js', '/b.js']);
              done();
            }