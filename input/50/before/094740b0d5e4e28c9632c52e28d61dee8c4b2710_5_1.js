function(){
                    var user = Common.entity.create(Common.entity.TYPE_TEST_A, {name:'freddy'}); 
                    user.saveCB( null, this );
                }