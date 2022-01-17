function(cnt){
                db.Items.length(function(cnt){
                    if (cnt > 0) throw 'Database clear failed!';
                    $test.context = new $test.Context({ name: 'storm' });
                    $test.context.onReady(function(db){
                        callback(db);
                    });
                });
            }