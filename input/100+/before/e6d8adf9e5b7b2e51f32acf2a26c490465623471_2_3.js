function(){

    async.waterfall(
    [
        // i. Get all movies
        function(callback) {
            var array = [];

            async.forEach(urls, function(url, callback){
                request(url, function(error, response, body){
                    if (!error && response.statusCode == 200) 
                    {
                        for (var i = 0; i < 60; i++) 
                        {
                            try
                            {
                                var data = JSON.parse(body);
                                var url = torrentz + data.query.results.dl[i].dt.a.href;
                                var title = helpers.sanitizeTitle(data.query.results.dl[i].dt.a.content);
                                var description = data.query.results.dl[i].dt.content;
                                
                                var element = {url: url, title: title, description: description};

                                array.pushIfNotExist(element, function(e) { 
                                    return e.title.toLowerCase() === element.title.toLowerCase(); 
                                });
                            }
                            catch(err)
                            {
                                //console.log("error: " + err);
                            }
                        }

                        callback();
                    }
                    else
                    {
                        callback();
                    }
                });
            }, function(err){
                if (err)
                    console.log("first error on callback: " + err);
                callback(null, array);
            });
        
        },
        
        // ii. Get posters from IMDB
        function(array, callback) {
            var array2 = [];
            async.forEach(array, function (movie, callback){ 
                
                if (movie.description.indexOf('movies') !== -1)
                {
                    tmdb.Movie.search({query: movie.title}, function(err,result) {
                        var poster = "";

                        try
                        {
                            var index = helpers.getIndexOfMovie(result);

                            if (result[index].posters.length >= 3)
                                poster = result[index].posters[3].image.url;
                            else
                                poster = result[index].posters[result[index].posters.length - 1].image.url;

                            var element = {url: movie.url, title: result[index].name, description: result[index].overview, poster: poster, rating: result[index].rating};

                            array2.pushIfNotExist(element, function(e) { 
                                return e.title.toLowerCase() === element.title.toLowerCase(); 
                            });
                            //array2.push(element);
                        }
                        catch(err)
                        {
                            poster = "";
                        }

                        callback();
                    });
                }
                else
                    callback();

            }, function(err) {
                if (err)
                    console.log("seccond error on callback: " + err);
                callback(null, array2);
            }); 
        }
    ],
        // the bonus final callback function
        function(err, status) {
            if (err)
                console.log("error on finish: " + err);
            fs.writeFile(__dirname + cacheDirectory, JSON.stringify(status), function(err) {
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
            }); 
        }
    );
}