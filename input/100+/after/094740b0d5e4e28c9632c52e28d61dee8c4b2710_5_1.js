function(done){
            var user = Common.entity.create(Common.entity.TYPE_TEST_A, {name:'freddy'}); 
            Step(
                function(){
                    assert( user.isNew() );
                    assert( !user.id );
                    user.saveCB( this );
                },
                function(err,result){
                    if( err ) throw err;
                    assert( !user.isNew() );
                    assert( user.id );
                    result.get('name').should.equal('freddy');
                    Common.entity.create( Common.entity.TYPE_TEST_A, result.id ).fetchCB( this );
                },
                function(err,result){
                    if( err ) throw err;
                    result.get('name').should.equal('freddy');
                    done();
                }
            )
        }