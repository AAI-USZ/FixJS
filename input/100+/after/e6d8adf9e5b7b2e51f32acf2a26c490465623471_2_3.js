function (movie, callback){ 
                
                    tmdb.Movie.search({query: movie.title}, function(err,result) {
                        var poster = "";

                        try
                        {
                            if (result != null)
                            {
                                var index = helpers.getIndexOfMovie(result);

                                if (result[index].posters.length >= 3)
                                    poster = result[index].posters[3].image.url;
                                else
                                    poster = result[index].posters[result[index].posters.length - 1].image.url;

                                helpers.gimmeTorrent(movie.url, function(torrent_url){
                                    var element = { url: torrent_url
                                                  , title: result[index].name
                                                  , description: result[index].overview
                                                  , poster: poster
                                                  , rating: result[index].rating
                                                  , release_date: result[index].released
                                                  , format: helpers.getMovieFormat(movie.dirty_title)
                                                  , id : movie.id};

                                    array2.pushIfNotExist(element, function(e) { 
                                        return e.title.toLowerCase() === element.title.toLowerCase(); 
                                    });
                                    //array2.push(element);
                                });
                            }
                        }
                        catch(err)
                        {
                            //console.log("error on the second loop: \n" + err);
                            poster = "";
                        }

                        callback();
                    });

            }