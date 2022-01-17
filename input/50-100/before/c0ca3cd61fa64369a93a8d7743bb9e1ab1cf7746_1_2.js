function(helper) {
              helper.compactJs().should.eql(['/large.js', '/a.js', '/b.js', '/c.js' ]);
            }