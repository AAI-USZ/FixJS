function($scope, $http, GridApi, appSettings) {
    reference.$inject = ["$scope", "$http", "GridApi", "appSettings"];
    $scope.$on("gridelement-edit", function() {
      if ($scope.grids.length === 0) {
        console.log("load..");
        return $scope.grids();
      }
    });
    $scope.grids = [];
    $scope.gridelement.Content = angular.fromJson($scope.gridelement.Content) || {
      Id: null
    };
    if ($scope.gridelement.Content.Id) {
      GridApi.getGrid({
        applicationId: appSettings.Id,
        Id: $scope.gridelement.Content.Id
      }, function(data) {
        return $scope.destination = data;
      });
    }
    $scope.choose = function(grid) {
      $scope.destination = grid;
      $scope.gridelement.Content.Id = grid.Id;
      $scope.$parent.Edit = 0;
      return $scope.$parent.save($scope.gridelement);
    };
    $scope.grids = function() {
      console.log(appSettings);
      return GridApi.grids({
        applicationId: appSettings.Id
      }, function(data) {
        console.log(data);
        return $scope.grids = data;
      });
    };
    return 1;
  }