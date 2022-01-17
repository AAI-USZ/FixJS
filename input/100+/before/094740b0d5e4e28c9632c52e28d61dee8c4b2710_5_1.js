function(done){
            Step(
                function(){
                    var user = Common.entity.create(Common.entity.TYPE_TEST_A, {name:'freddy'}); 
                    user.saveCB( null, this );
                },
                function(err,user){
                    if( err ) throw err;
                    user.get('name').should.equal('freddy');
                    var restoredUser = Common.entity.create( Common.entity.TYPE_TEST_A, user.id );
                    restoredUser.fetchCB( this );
                },
                function(err,restoredUser){
                    if( err ) throw err;
                    restoredUser.get('name').should.equal('freddy');
                    done();
                }
            )
        }