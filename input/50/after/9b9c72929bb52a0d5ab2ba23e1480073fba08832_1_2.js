function(grid) {
      $scope.destination = grid;
      $scope.gridelement.Content.Id = grid.Id;
      $scope.$parent.Edit = 0;
      return $scope.$parent.save($scope.gridelement);
    }