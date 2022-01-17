function(err,restoredUser){
                    if( err ) throw err;
                    restoredUser.get('name').should.equal('freddy');
                    done();
                }