function () {
    var done, expectedTasks = [
      {text:'task 1', done:false},
      {text:'task 2', done:true},
      {text:'task 3', done:false}
    ];

    beforeEach(function () {
      runs(function () {
        mainPage.setupTheTaskList(expectedTasks, function (err) {
          done = !err;
        });
      });

      waitsFor(function () {
        return typeof done !== 'undefined';
      }, "Could not set up the initial task list", 1000);
    });

    it("the page has been setup to empty task list with no errors", function () {
      expect(done).toBeTruthy();
    });

    it("when the page starts it shows the saved tasks", function () {
      mainPage.startApplication();

      expect(mainPage.displayedTasks()).toEqual(expectedTasks);
    });
  }