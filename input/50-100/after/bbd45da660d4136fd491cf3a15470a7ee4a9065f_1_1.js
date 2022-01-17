function() {
  expect(1);
  stop();

  var count = 0;
  window.history.pushState = function(data, title, path) {
    count++;
  };

  setTimeout(function() {
    start();
    equal(count, 0, "pushState should not have been called");
  }, 100);

  locationObject.setURL(window.location.pathname);
}