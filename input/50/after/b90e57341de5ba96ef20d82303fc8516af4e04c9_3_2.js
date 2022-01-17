function() {
    equal(this, main.views[".left"][1].views[".inner-left"],
      "Nested View render deferred context is View");
    start();
  }