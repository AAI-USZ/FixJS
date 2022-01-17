function(){
                    assert( user.isNew() );
                    assert( !user.id );
                    user.saveCB( this );
                }