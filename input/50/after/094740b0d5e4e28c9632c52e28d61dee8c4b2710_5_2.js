function(err,result){
                    if( err ) throw err;
                    result.get('name').should.equal('freddy');
                    done();
                }