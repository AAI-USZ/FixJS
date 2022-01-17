function() {
  var clearTour;

  clearTour = function(tour) {
    tour.setState("current_step", null);
    tour.setState("end", null);
    return $.each(tour._steps, function(i, s) {
      return s.element.popover("hide").removeData("popover");
    });
  };

  test("Tour should set the tour options", function() {
    var tour;
    tour = new Tour({
      afterSetState: function() {
        return true;
      },
      afterGetState: function() {
        return true;
      }
    });
    ok(tour._options.afterGetState, "options.afterGetState is set");
    ok(tour._options.afterSetState, "options.afterSetState is not set");
    return clearTour(tour);
  });

  test("Tour should accept an array of steps and set the current step", function() {
    var tour;
    tour = new Tour();
    deepEqual(tour._steps, [], "tour accepts an array of steps");
    strictEqual(tour._current, 0, "tour initializes current step");
    return clearTour(tour);
  });

  test("Tour.setState should save state cookie", function() {
    var tour;
    tour = new Tour();
    tour.setState("test", "yes");
    strictEqual($.cookie("tour_test"), "yes", "tour saves state");
    return clearTour(tour);
  });

  test("Tour.getState should get state cookie", function() {
    var tour;
    tour = new Tour();
    tour.setState("test", "yes");
    strictEqual(tour.getState("test"), "yes", "tour gets state");
    $.cookie("tour_test", null);
    return clearTour(tour);
  });

  test("Tour.addStep should add a step", function() {
    var step, tour;
    tour = new Tour();
    step = {
      element: $("<div></div>").appendTo("#qunit-fixture")
    };
    tour.addStep(step);
    deepEqual(tour._steps, [step], "tour adds steps");
    return clearTour(tour);
  });

  test("Tour.getStep should get a step", function() {
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
  });

  test("Tour.start should start a tour", function() {
    var tour;
    tour = new Tour();
    tour.addStep({
      element: $("<div></div>").appendTo("#qunit-fixture")
    });
    tour.start();
    strictEqual($(".popover").length, 1, "tour starts");
    return clearTour(tour);
  });

  test("Tour.start should not start a tour that ended", function() {
    var tour;
    tour = new Tour();
    tour.addStep({
      element: $("<div></div>").appendTo("#qunit-fixture")
    });
    tour.setState("end", "yes");
    tour.start();
    strictEqual($(".popover").length, 0, "previously ended tour don't start again");
    return clearTour(tour);
  });

  test("Tour.start(true) should force starting a tour that ended", function() {
    var tour;
    tour = new Tour();
    tour.addStep({
      element: $("<div></div>").appendTo("#qunit-fixture")
    });
    tour.setState("end", "yes");
    tour.start(true);
    strictEqual($(".popover").length, 1, "previously ended tour starts again if forced to");
    return clearTour(tour);
  });

  test("Tour.next should hide current step and show next step", function() {
    var tour;
    tour = new Tour();
    tour.addStep({
      element: $("<div></div>").appendTo("#qunit-fixture")
    });
    tour.addStep({
      element: $("<div></div>").appendTo("#qunit-fixture")
    });
    tour.start();
    tour.next();
    strictEqual(tour.getStep(0).element.data("popover").tip().filter(":visible").length, 0, "tour hides current step");
    strictEqual(tour.getStep(1).element.data("popover").tip().filter(":visible").length, 1, "tour shows next step");
    return clearTour(tour);
  });

  test("Tour.end should hide current step and set end state", function() {
    var tour;
    tour = new Tour();
    tour.addStep({
      element: $("<div></div>").appendTo("#qunit-fixture")
    });
    tour.start();
    tour.end();
    strictEqual(tour.getStep(0).element.data("popover").tip().filter(":visible").length, 0, "tour hides current step");
    strictEqual(tour.getState("end"), "yes", "tour sets end state");
    return clearTour(tour);
  });

  test("Tour.ended should return true is tour ended and false if not", function() {
    var tour;
    tour = new Tour();
    tour.addStep({
      element: $("<div></div>").appendTo("#qunit-fixture")
    });
    tour.start();
    strictEqual(tour.ended(), false, "tour returns false if not ended");
    tour.end();
    strictEqual(tour.ended(), true, "tour returns true if ended");
    return clearTour(tour);
  });

  test("Tour.restart should clear all states and start tour", function() {
    var tour;
    tour = new Tour();
    tour.addStep({
      element: $("<div></div>").appendTo("#qunit-fixture")
    });
    tour.addStep({
      element: $("<div></div>").appendTo("#qunit-fixture")
    });
    tour.start();
    tour.next();
    tour.end();
    tour.restart();
    strictEqual(tour.getState("end"), null, "tour sets end state");
    strictEqual(tour._current, 0, "tour sets first step");
    strictEqual($(".popover").length, 1, "tour starts");
    return clearTour(tour);
  });

  test("Tour.hideStep should hide a step", function() {
    var tour;
    tour = new Tour();
    tour.addStep({
      element: $("<div></div>").appendTo("#qunit-fixture")
    });
    tour.start();
    tour.hideStep(0);
    strictEqual(tour.getStep(0).element.data("popover").tip().filter(":visible").length, 0, "tour hides step");
    return clearTour(tour);
  });

  test("Tour.showStep should set a step and show it", function() {
    var tour;
    tour = new Tour();
    tour.addStep({
      element: $("<div></div>").appendTo("#qunit-fixture")
    });
    tour.addStep({
      element: $("<div></div>").appendTo("#qunit-fixture")
    });
    tour.showStep(1);
    strictEqual(tour._current, 1, "tour sets step");
    strictEqual(tour.getStep(1).element.data("popover").tip().filter(":visible").length, 1, "tour shows step");
    return clearTour(tour);
  });

  test("Tour.setCurrentStep should set the current step", function() {
    var tour;
    tour = new Tour();
    tour.setCurrentStep(4);
    strictEqual(tour._current, 4, "tour sets current step if passed a value");
    tour.setState("current_step", 2);
    tour.setCurrentStep();
    strictEqual(tour._current, 2, "tour reads current step state if not passed a value");
    return clearTour(tour);
  });

  test("Tour.showNextStep should show the next step", function() {
    var tour;
    tour = new Tour();
    tour.addStep({
      element: $("<div></div>").appendTo("#qunit-fixture")
    });
    tour.addStep({
      element: $("<div></div>").appendTo("#qunit-fixture")
    });
    tour.start();
    tour.showNextStep();
    strictEqual(tour.getStep(1).element.data("popover").tip().filter(":visible").length, 1, "tour shows next step");
    return clearTour(tour);
  });

}