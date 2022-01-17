function($rootScope, $compile) {
      element = $compile(
        '<ul>' +
          '<li ng-repeat="item in items" ng-bind="key + \':\' + val + \':\' + $position + \'|\'"></li>' +
        '</ul>')($rootScope);
      a = {};
      b = {};
      c = {};
      d = {};

      $rootScope.items = [a, b, c];
      $rootScope.$digest();
      lis = element.find('li');
    }