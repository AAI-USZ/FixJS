function ($scope, $resource) {
    $scope.hof = $resource('/awards/hof');
    $scope.hofData = $scope.hof.get();
}