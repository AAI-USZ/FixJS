function(){
                $test.context = new $test.Context({ name: 'storm' });
                $test.context.onReady(function(db){
                    callback(db);
                });
            }