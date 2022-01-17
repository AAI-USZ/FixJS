function(err) {
                if(err) {
                    console.log(err);
                } else 
                {
                    fs.open(__dirname + cacheLogDir, 'a', 666, function( e, id ) {
                        fs.write( id, 'created new cache file at: ' + new Date() + '\n', null, 'utf8', function(){
                            fs.close(id, function(){
                                console.log("Cache file updated !");
                            });
                        });
                    });
                }
            }