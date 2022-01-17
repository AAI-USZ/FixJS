function($routeProvider){
      $routeProvider.when('/foo', {template: 'foo.html'});
      $routeProvider.when('/bar/', {template: 'bar.html'});
    }