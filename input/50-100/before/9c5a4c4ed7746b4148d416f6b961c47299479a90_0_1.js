function () {
      mainPage.startApplication();

      expect(mainPage.displayedTasks().length).toBe(0);
    }