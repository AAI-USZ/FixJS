function Vegas(settings) {

    this.settings = settings;

    // Let the view know about the primary application
    var _context = {vegas: this};

    // Provides a way to create a new view given the current context.
    this.View = function ViewCreator(options) {
      return new View(options, _context);
    };

    // Creates a view given the above context
    var view = new this.View();

  }