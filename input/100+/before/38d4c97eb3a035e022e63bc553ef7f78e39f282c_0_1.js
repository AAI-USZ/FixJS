function(err,result) {
						var poster = "";

						try{
						if (result[0].posters.length >= 3)
							poster = result[0].posters[3].image.url;
						else
							poster = result[0].posters[result[0].posters.length - 1].image.url;
						}
						catch(err)
						{
							poster = "";
						}

					  	var element = {url: movie.url, title: result[0].name, description: result[0].overview, poster: poster, rating: result[0].rating};

						array2.push(element);

						callback();
					}