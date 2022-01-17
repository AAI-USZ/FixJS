function($scope, $routeParams, clientApi) {
    var p;
    p = $routeParams;
    return clientApi.gridpageJson({
      link: p.link
    }, function(data) {
      $scope.$parent.refresh(data.Lines);
      return $scope.data = data;
    });
  }