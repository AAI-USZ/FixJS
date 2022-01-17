function($route, $location, $rootScope) {
      $rootScope.$on('$beforeRouteChange', function(event, next, current) {
        log += 'before();';
        expect(current).toBe($route.current);
        lastRoute = current;
        nextRoute = next;
      });
      $rootScope.$on('$afterRouteChange', function(event, current, last) {
        log += 'after();';
        expect(current).toBe($route.current);
        expect(lastRoute).toBe(last);
        expect(nextRoute).toBe(current);
      });

      $location.path('/Book/Moby/Chapter/Intro').search('p=123');
      $rootScope.$digest();
      $httpBackend.flush();
      expect(log).toEqual('before();after();');
      expect($route.current.params).toEqual({book:'Moby', chapter:'Intro', p:'123'});

      log = '';
      $location.path('/Blank').search('ignore');
      $rootScope.$digest();
      expect(log).toEqual('before();after();');
      expect($route.current.params).toEqual({ignore:true});

      log = '';
      $location.path('/NONE');
      $rootScope.$digest();
      expect(log).toEqual('before();after();');
      expect($route.current).toEqual(null);
    }