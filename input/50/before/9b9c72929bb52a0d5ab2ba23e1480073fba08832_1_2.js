function() {
      return GridApi.grids({
        applicationId: appSettings.Id
      }, function(data) {
        console.log(data);
        return $scope.grids = data;
      });
    }