function (data) {
    $scope.name = data.name;
    $scope.users = data.users;
    $scope.$apply();
  }