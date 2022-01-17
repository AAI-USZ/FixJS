function() {
      if(!$scope.streaming) {
        $scope.streaming = true;
        $scope.intervalId = rpc('example.on');
      }
      else {
        $scope.streaming = false;
        rpc('example.off', $scope.intervalId);
      }
    }