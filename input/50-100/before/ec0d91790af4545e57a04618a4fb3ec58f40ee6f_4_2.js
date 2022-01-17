function(err, result) {
                test.ok(err != null);                
                db.close();
                test.done();              
            }