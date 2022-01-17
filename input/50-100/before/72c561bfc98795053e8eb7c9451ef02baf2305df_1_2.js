function(helper) {
          helper.compactJs().should.eql(['/global.js']);
          doneCount += 1;
          if (doneCount === 2) {
            done();
          }
        }