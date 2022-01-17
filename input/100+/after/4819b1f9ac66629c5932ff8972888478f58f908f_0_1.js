function generateHtmlFromMovie(movie) {
      var movieHtml = '';

      movieHtml += '<h3>' + movie.name + ' (' + movie.year + ')</h3>';
      movieHtml += '<img src="' + movie.info.poster + '">';
      movieHtml += '<h4>Combined Rating: ' + movie.combined_rating + '</h4>';

      var movieRatings = '<h4>Ratings: </h4>';
      $.each(movie.ratings, function(rating_site, rating) {
        if (rating.error) {
          movieRatings += '<h4>' + rating_site + '</h4>';
          movieRatings += rating.error;
        } else {
          movieRatings += '<h4><a href="' + rating.url + '">';
          movieRatings += rating_site + '</a>:</h4> ' + rating.score;
        }
      });
      movieHtml += movieRatings;
      return movieHtml;
    }