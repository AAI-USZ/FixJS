function(err, val) {
                  should.equal(val, "Geneva");
                  //assert cache hit
                  true.should.equal(called);
                  called = false;
                  done();
                  }