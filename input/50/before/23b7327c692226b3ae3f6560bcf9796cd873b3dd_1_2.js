function(err, val) {
                    should.equal(val, "world");
                    //assert cache hit
                    true.should.equal(called);
                    called = false;
                    done();
                  }