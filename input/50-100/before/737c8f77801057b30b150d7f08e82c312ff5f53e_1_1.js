function() {
    clearTimeout(timer);
    start();

    ok(get(ebryn, 'isLoaded'), "data loads asynchronously");
    equal(get(ebryn, 'height'), 70, "data from fixtures is loaded correctly");

    var wycats = store.find(Person, 'wycats');
    equal(get(wycats, 'isLoaded'), true, "subsequent requests for records are returned immediately");
    equal(get(wycats, 'height'), 65, "subsequent requested records contain correct information");
  }