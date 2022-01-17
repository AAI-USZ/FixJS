function($rootScope, $compile) {
    element = $compile(
      '<ul>' +
        '<li ng-repeat="item in items">{{item}}:{{$first}}-{{$middle}}-{{$last}}|</li>' +
      '</ul>')($rootScope);
    $rootScope.items = ['misko', 'shyam', 'doug'];
    $rootScope.$digest();
    expect(element.text()).
        toEqual('misko:true-false-false|shyam:false-true-false|doug:false-false-true|');

    $rootScope.items.push('frodo');
    $rootScope.$digest();
    expect(element.text()).
        toEqual('misko:true-false-false|' +
                'shyam:false-true-false|' +
                'doug:false-true-false|' +
                'frodo:false-false-true|');

    $rootScope.items.pop();
    $rootScope.items.pop();
    $rootScope.$digest();
    expect(element.text()).toEqual('misko:true-false-false|shyam:false-false-true|');

    $rootScope.items.pop();
    $rootScope.$digest();
    expect(element.text()).toEqual('misko:true-false-true|');
  }