function() {
      clearTimeout(timer);
      start();

      equal(get(wycats, 'isLoaded'), true, "subsequent requests for records are returned asynchronously");
      equal(get(wycats, 'height'), 65, "subsequent requested records contain correct information");
    }