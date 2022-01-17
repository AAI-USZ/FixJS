function($rootScope) {
        $rootScope.$watch('a', function() {$rootScope.b++;});
        $rootScope.$watch('b', function() {$rootScope.a++;});
        $rootScope.a = $rootScope.b = 0;

        expect(function() {
          $rootScope.$digest();
        }).toThrow('100 $digest() iterations reached. Aborting!\n'+
            'Watchers fired in the last 5 iterations: ' +
            '[["a; newVal: 96; oldVal: 95","b; newVal: 97; oldVal: 96"],' +
            '["a; newVal: 97; oldVal: 96","b; newVal: 98; oldVal: 97"],' +
            '["a; newVal: 98; oldVal: 97","b; newVal: 99; oldVal: 98"],' +
            '["a; newVal: 99; oldVal: 98","b; newVal: 100; oldVal: 99"],' +
            '["a; newVal: 100; oldVal: 99","b; newVal: 101; oldVal: 100"]]');

        expect($rootScope.$$phase).toBeNull();
      }