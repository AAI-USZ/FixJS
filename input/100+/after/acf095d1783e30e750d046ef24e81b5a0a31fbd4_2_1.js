function() {
  if (this.$injector) {
    var $rootScope = this.$injector.get('$rootScope');
    var $log = this.$injector.get('$log');
    // release the injector
    dealoc($rootScope);

    // check $log mock
    $log.assertEmpty && $log.assertEmpty();
  }

  // complain about uncleared jqCache references
  var count = 0;

  // This line should be enabled as soon as this bug is fixed: http://bugs.jquery.com/ticket/11775
  //var cache = jqLite.cache;
  var cache = JQLite.cache;

  forEachSorted(cache, function(expando, key){
    forEach(expando.data, function(value, key){
      count ++;
      if (value.$element) {
        dump('LEAK', key, value.$id, sortedHtml(value.$element));
      } else {
        dump('LEAK', key, toJson(value));
      }
    });
  });
  if (count) {
    throw new Error('Found jqCache references that were not deallocated! count: ' + count);
  }
}