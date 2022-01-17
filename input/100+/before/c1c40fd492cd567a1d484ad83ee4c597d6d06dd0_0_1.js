function() {
  var paul = Person.createRecord({firstName: 'Paul', lastName: 'Chavard', height: 70});

  paul.on('didCreate', function() {
    clearTimeout(timer);
    start();

    equal(get(paul, 'isNew'), false, "data loads asynchronously");
    equal(get(paul, 'isDirty'), false, "data loads asynchronously");
    equal(get(paul, 'height'), 70, "data from fixtures is saved correctly");
  });

  store.commit();

  stop();

  var timer = setTimeout(function() {
    start();
    ok(false, "timeout exceeded waiting for fixture data");
  }, 1000);
}