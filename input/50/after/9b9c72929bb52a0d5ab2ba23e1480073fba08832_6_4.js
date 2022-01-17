function(data) {
      $scope.$parent.refresh(data.Lines);
      return $scope.data = data;
    }