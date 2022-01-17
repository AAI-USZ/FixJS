function() {
    module(function($routeProvider) {
      $routeProvider.when('/foo', {controller: noop, template: 'myUrl1'});
    });

    inject(function($route, $location, $rootScope, $httpBackend) {
      $location.path('/foo');
      $httpBackend.expect('GET', 'myUrl1').respond(404, '');
      element.text('content');

      $rootScope.$digest();
      $httpBackend.flush();

      expect(element.text()).toBe('');
    });
  }