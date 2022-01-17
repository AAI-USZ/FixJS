function($scope, $routeParams, clientApi) {
    var p;
    p = $routeParams;
    $scope.$parent.refresh(p.link);
    return clientApi.getJson({
      link: p.link
    }, function(data) {
      return $scope.data = data;
    });
  }