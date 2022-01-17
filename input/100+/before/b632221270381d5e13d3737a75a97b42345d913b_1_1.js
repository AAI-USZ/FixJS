function() {
  expect(2);

  var count = 0;

  adapter.findAll = function(store, type) {
    count++;

    if (count === 1) {
      stop();

      setTimeout(function() {
        start();

        store.load(type, { id: 1, name: "Braaaahm Dale" });
        equal(get(array, 'length'), 1, "The array is now 1 length");

        store.findAll(Person);
      }, 100);
    } else {
      ok(false, "Should not get here");
    }
  };

  var array = store.findAll(Person);
  equal(get(array, 'length'), 0, "The array is 0 length do far");
}