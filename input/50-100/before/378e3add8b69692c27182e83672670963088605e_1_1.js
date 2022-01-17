function() {
    var step, tour;
    tour = new Tour();
    step = {
      element: $("<div></div>").appendTo("#qunit-fixture"),
      path: "test",
      placement: "left",
      title: "Test",
      content: "Just a test",
      next: 2,
      end: false,
      animation: false
    };
    tour.addStep(step);
    deepEqual(tour.getStep(0), step, "tour gets a step");
    return clearTour(tour);
  }