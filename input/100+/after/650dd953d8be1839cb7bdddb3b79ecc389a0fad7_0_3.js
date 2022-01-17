function(tab) {
          return $timeout(function() {
            return $scope.tabs.splice($scope.tabs.indexOf(tab, 1));
          });
        }