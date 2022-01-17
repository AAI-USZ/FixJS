function(err,user){
                    if( err ) throw err;
                    user.get('name').should.equal('freddy');
                    var restoredUser = Common.entity.create( Common.entity.TYPE_TEST_A, user.id );
                    restoredUser.fetchCB( this );
                }