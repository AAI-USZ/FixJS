function(err,result){
                    if( err ) throw err;
                    assert( !user.isNew() );
                    assert( user.id );
                    result.get('name').should.equal('freddy');
                    Common.entity.create( Common.entity.TYPE_TEST_A, result.id ).fetchCB( this );
                }