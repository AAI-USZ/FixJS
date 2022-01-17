function($rootScope, $compile) {
    element = $compile(
      '<ul>' +
        '<li ng-repeat="item in items" ng-bind="item + \':\' + $position + \'|\'"></li>' +
      '</ul>')($rootScope);
    $rootScope.items = ['misko', 'shyam', 'doug'];
    $rootScope.$digest();
    expect(element.text()).toEqual('misko:first|shyam:middle|doug:last|');

    $rootScope.items.push('frodo');
    $rootScope.$digest();
    expect(element.text()).toEqual('misko:first|shyam:middle|doug:middle|frodo:last|');

    $rootScope.items.pop();
    $rootScope.items.pop();
    $rootScope.$digest();
    expect(element.text()).toEqual('misko:first|shyam:last|');
  }