function() {
    var routeChangeSpy = jasmine.createSpy('route change');

    module(function($routeProvider) {
      $routeProvider.when('/one', {}); // no otherwise defined
    });

    inject(function($rootScope, $route, $location) {
      $rootScope.$on('$beforeRouteChange', routeChangeSpy);
      $rootScope.$on('$afterRouteChange', routeChangeSpy);

      $rootScope.$digest();
      expect(routeChangeSpy).not.toHaveBeenCalled();

      $location.path('/no-route-here');
      $rootScope.$digest();
      expect(routeChangeSpy).not.toHaveBeenCalled();
    });
  }