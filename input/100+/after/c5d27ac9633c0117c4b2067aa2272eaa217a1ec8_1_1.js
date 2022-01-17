function($provide, $routeProvider) {
        $provide.factory('b', function($q) {
          deferB = $q.defer();
          return deferB.promise;
        });
        $routeProvider.when('/path', { templateUrl: 'foo.html', resolve: {
          a: function($q) {
            deferA = $q.defer();
            return deferA.promise;
          },
          b: 'b',
          c: ['$q', 'b', function($q, b) {
            deferC = $q.defer();
            return deferC.promise;
          }]
        } });
      }