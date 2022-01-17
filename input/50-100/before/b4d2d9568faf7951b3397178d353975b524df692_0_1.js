function(movie) {
    var view = new AnyGood.MovieView({model: movie});
    this.$("#result").html(view.render().el);
  }