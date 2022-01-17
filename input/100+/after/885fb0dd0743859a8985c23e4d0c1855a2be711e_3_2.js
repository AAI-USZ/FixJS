function() {
    it('should not fire $after/beforeRouteChange during bootstrap (if no route)', function() {
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
    });

    it('should fire $beforeRouteChange and resolve promises', function() {
      var deferA,
          deferB;

      module(function($provide, $routeProvider) {
        $provide.factory('b', function($q) {
          deferB = $q.defer();
          return deferB.promise;
        });
        $routeProvider.when('/path', { template: 'foo.html', resolve: {
          a: function($q) {
            deferA = $q.defer();
            return deferA.promise;
          },
          b: 'b'
        } });
      });

      inject(function($location, $route, $rootScope, $httpBackend) {
        var log = '';

        $httpBackend.expectGET('foo.html').respond('FOO');

        $location.path('/path');
        $rootScope.$digest();
        expect(log).toEqual('');
        $httpBackend.flush();
        expect(log).toEqual('');
        deferA.resolve();
        $rootScope.$digest();
        expect(log).toEqual('');
        deferB.resolve();
        $rootScope.$digest();
        expect($route.current.locals.$template).toEqual('FOO');
      });
    });


    it('should fire $routeChangeError event on resolution error', function() {
      var deferA;

      module(function($provide, $routeProvider) {
        $routeProvider.when('/path', { template: 'foo', resolve: {
          a: function($q) {
            deferA = $q.defer();
            return deferA.promise;
          }
        } });
      });

      inject(function($location, $route, $rootScope) {
        var log = '';

        $rootScope.$on('$beforeRouteChange', function() { log += 'before();'; });
        $rootScope.$on('$routeChangeError', function(e, n, l, reason) { log += 'failed(' + reason + ');'; });

        $location.path('/path');
        $rootScope.$digest();
        expect(log).toEqual('before();');

        deferA.reject('MyError');
        $rootScope.$digest();
        expect(log).toEqual('before();failed(MyError);');
      });
    });


    it('should fetch templates', function() {
      module(function($routeProvider) {
        $routeProvider.
          when('/r1', { template: 'r1.html' }).
          when('/r2', { template: 'r2.html' });
      });

      inject(function($route, $httpBackend, $location, $rootScope) {
        var log = '';
        $rootScope.$on('$beforeRouteChange', function(e, next) { log += '$before(' + next.template + ');'});
        $rootScope.$on('$afterRouteChange', function(e, next) { log += '$after(' + next.template + ');'});

        $httpBackend.expectGET('r1.html').respond('R1');
        $httpBackend.expectGET('r2.html').respond('R2');

        $location.path('/r1');
        $rootScope.$digest();
        expect(log).toBe('$before(r1.html);');

        $location.path('/r2');
        $rootScope.$digest();
        expect(log).toBe('$before(r1.html);$before(r2.html);');

        $httpBackend.flush();
        expect(log).toBe('$before(r1.html);$before(r2.html);$after(r2.html);');
        expect(log).not.toContain('$after(r1.html);');
      });
    });


    it('should not update $routeParams until $afterRouteChange', function() {
      module(function($routeProvider) {
        $routeProvider.
          when('/r1/:id', { template: 'r1.html' }).
          when('/r2/:id', { template: 'r2.html' });
      });

      inject(function($route, $httpBackend, $location, $rootScope, $routeParams) {
        var log = '';
        $rootScope.$on('$beforeRouteChange', function(e, next) { log += '$before' + toJson($routeParams) + ';'});
        $rootScope.$on('$afterRouteChange', function(e, next) { log += '$after' + toJson($routeParams) + ';'});

        $httpBackend.whenGET('r1.html').respond('R1');
        $httpBackend.whenGET('r2.html').respond('R2');

        $location.path('/r1/1');
        $rootScope.$digest();
        expect(log).toBe('$before{};');
        $httpBackend.flush();
        expect(log).toBe('$before{};$after{"id":"1"};');

        log = '';

        $location.path('/r2/2');
        $rootScope.$digest();
        expect(log).toBe('$before{"id":"1"};');
        $httpBackend.flush();
        expect(log).toBe('$before{"id":"1"};$after{"id":"2"};');
      });
    });


    it('should drop in progress route change when new route change occurs', function() {
      module(function($routeProvider) {
        $routeProvider.
          when('/r1', { template: 'r1.html' }).
          when('/r2', { template: 'r2.html' });
      });

      inject(function($route, $httpBackend, $location, $rootScope) {
        var log = '';
        $rootScope.$on('$beforeRouteChange', function(e, next) { log += '$before(' + next.template + ');'});
        $rootScope.$on('$afterRouteChange', function(e, next) { log += '$after(' + next.template + ');'});

        $httpBackend.expectGET('r1.html').respond('R1');
        $httpBackend.expectGET('r2.html').respond('R2');

        $location.path('/r1');
        $rootScope.$digest();
        expect(log).toBe('$before(r1.html);');

        $location.path('/r2');
        $rootScope.$digest();
        expect(log).toBe('$before(r1.html);$before(r2.html);');

        $httpBackend.flush();
        expect(log).toBe('$before(r1.html);$before(r2.html);$after(r2.html);');
        expect(log).not.toContain('$after(r1.html);');
      });
    });


    it('should drop in progress route change when new route change occurs and old fails', function() {
      module(function($routeProvider) {
        $routeProvider.
          when('/r1', { templateUrl: 'r1.html' }).
          when('/r2', { templateUrl: 'r2.html' });
      });

      inject(function($route, $httpBackend, $location, $rootScope) {
        var log = '';
        $rootScope.$on('$routeChangeError', function(e, next, last, error) {
          log += '$failed(' + next.templateUrl + ', ' + error.status + ');';
        });
        $rootScope.$on('$beforeRouteChange', function(e, next) { log += '$before(' + next.templateUrl + ');'});
        $rootScope.$on('$afterRouteChange', function(e, next) { log += '$after(' + next.templateUrl + ');'});

        $httpBackend.expectGET('r1.html').respond(404, 'R1');
        $httpBackend.expectGET('r2.html').respond('R2');

        $location.path('/r1');
        $rootScope.$digest();
        expect(log).toBe('$before(r1.html);');

        $location.path('/r2');
        $rootScope.$digest();
        expect(log).toBe('$before(r1.html);$before(r2.html);');

        $httpBackend.flush();
        expect(log).toBe('$before(r1.html);$before(r2.html);$after(r2.html);');
        expect(log).not.toContain('$after(r1.html);');
      });
    });


    it('should catch local factory errors', function() {
      var myError = new Error('MyError');
      module(function($routeProvider, $exceptionHandlerProvider) {
        $exceptionHandlerProvider.mode('log');
        $routeProvider.when('/locals', {
          resolve: {
            a: function($q) {
              throw myError;
            }
          }
        });
      });

      inject(function($location, $route, $rootScope, $exceptionHandler) {
        $location.path('/locals');
        $rootScope.$digest();
        expect($exceptionHandler.errors).toEqual([myError]);
      });
    });
  }