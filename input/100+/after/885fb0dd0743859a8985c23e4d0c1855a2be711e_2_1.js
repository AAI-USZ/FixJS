function() {
    module(function($routeProvider) {
      $routeProvider.when('/foo', {controller: noop, template: 'myUrl1'});
    });

    inject(function($route, $rootScope, $location, $templateCache) {
      $templateCache.put('myUrl1', [200, 'my partial', {}]);
      $location.path('/foo');

      var called = 0;
      // we want to assert only during first watch
      $rootScope.$watch(function() {
        if (!called++) expect(element.text()).toBe('');
      });

      $rootScope.$digest();
      expect(element.text()).toBe('my partial');
    });
  }