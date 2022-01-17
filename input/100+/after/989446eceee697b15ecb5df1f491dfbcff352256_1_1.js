function() {
      module(function($rootScopeProvider, $exceptionHandlerProvider) {
        $rootScopeProvider.digestTtl(2);
        $exceptionHandlerProvider.mode('log');
      });
      inject(function($rootScope, $exceptionHandler) {
        $rootScope.$watch('a', function() {$rootScope.b++;});
        $rootScope.$watch('b', function() {$rootScope.a++;});
        $rootScope.a = $rootScope.b = 0;

        expect(function() {
          $rootScope.$apply();
        }).toThrow();

        expect($exceptionHandler.errors[0]).toBeDefined();

        expect($rootScope.$$phase).toBeNull();
      });
    }