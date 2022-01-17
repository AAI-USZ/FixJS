function() {
      equal(view.$("ul").children().length, 4, "Only four elements");
      equal(view.views.ul.length, 4, "Only four Views");

      start();
    }