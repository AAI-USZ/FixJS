function(tab, index) {
          $scope.tabs.push(tab);
          if ($scope.tabs.length === 1) return $scope.selectTab(tab);
        }