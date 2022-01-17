function(name, year, $spinner) {
    $spinner.removeClass('hidden');

    var movie = new AnyGood.Movie({name: name, year: year});

    movie.fetch({
      success: function(movie) {
        AnyGood.mainView.renderMovie(movie);
      },
      error: function() {
        AnyGood.mainView.renderError();
      }
    });
    $spinner.addClass('hidden');
  }