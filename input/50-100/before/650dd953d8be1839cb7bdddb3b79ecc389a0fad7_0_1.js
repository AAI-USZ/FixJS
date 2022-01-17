function(tab) {
          var _i, _len, _ref, _tab;
          _ref = $scope.tabs;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            _tab = _ref[_i];
            _tab.selected(false);
          }
          tab.selected(true);
          $scope.selectedTab = tab;
          return $scope.selectedIdx = $scope.tabs.indexOf(tab);
        }