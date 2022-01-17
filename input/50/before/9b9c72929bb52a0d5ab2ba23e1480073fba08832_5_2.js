function($scope, $routeParams, clientApi) {
    var p;
    p = $routeParams;
    return clientApi.getJson({
      link: p.link
    }, function(data) {
      return $scope.data = data;
    });
  }