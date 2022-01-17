function() {
    var tour;
    tour = new Tour();
    tour.addStep({
      element: $("<div></div>").appendTo("#qunit-fixture")
    });
    tour.addStep({
      element: $("<div></div>").appendTo("#qunit-fixture")
    });
    tour.showStep(1);
    tour.showPrevStep();
    strictEqual(tour.getStep(0).element.data("popover").tip().filter(":visible").length, 1, "tour shows previous step");
    return clearTour(tour);
  }