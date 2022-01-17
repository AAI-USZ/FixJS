function () {
      var started;
      runs(function () {
        mainPage.startApplication(function () {
          started = true;
        });
      });

      waitsFor(function () {
        return typeof started !== 'undefined';
      }, "Could not start the application", 1000);

      runs(function () {
        expect(started).toBeTruthy();
        expect(mainPage.displayedTasks().length).toBe(0);
      });
    }