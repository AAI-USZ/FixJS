function (movie, callback){ 
                
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

            }