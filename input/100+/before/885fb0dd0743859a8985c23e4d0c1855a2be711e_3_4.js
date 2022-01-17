function() {
    module(function($routeProvider){
      $routeProvider.when('/foo', {template: 'foo.html'});
      $routeProvider.when('/bar/', {template: 'bar.html'});
    });

    inject(function($route, $location, $rootScope) {
      $location.path('/foo');
      $rootScope.$digest();
      expect($location.path()).toBe('/foo');
      expect($route.current.template).toBe('foo.html');

      $location.path('/foo/');
      $rootScope.$digest();
      expect($location.path()).toBe('/foo');
      expect($route.current.template).toBe('foo.html');

      $location.path('/bar');
      $rootScope.$digest();
      expect($location.path()).toBe('/bar/');
      expect($route.current.template).toBe('bar.html');

      $location.path('/bar/');
      $rootScope.$digest();
      expect($location.path()).toBe('/bar/');
      expect($route.current.template).toBe('bar.html');
    });
  }