function() {

  angular.module('angularBootstrap.tabs', []).directive('strapTabs', [
    '$timeout', function($timeout) {
      var controllerFn;
      controllerFn = function($scope, $element, $attrs) {
        $scope.tabs = [];
        $scope.$watch('tabs.length', function(tabsL, oldL) {
          if (tabsL > 0 && tabsL < oldL) {
            if ($scope.tabs.indexOf($scope.selectedTab === -1)) {
              return $scope.selectTab($scope.tabs[Math.max($scope.selectedIdx - 1, 0)]);
            }
          }
        });
        $scope.selectTab = function(tab) {
          var _i, _len, _ref, _tab;
          _ref = $scope.tabs;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            _tab = _ref[_i];
            _tab.selected(false);
          }
          $timeout(function() {
            return tab.selected(true);
          });
          $scope.selectedTab = tab;
          $scope.selectedIdx = $scope.tabs.indexOf(tab);
          if ($scope.onTabSelect != null) $scope.onTabSelect(tab);
          return null;
        };
        $scope.changeTab = function(index) {
          try {
            return $scope.selectTab($scope.tabs[index]);
          } catch (e) {
            console.error("could not change tab, probably array out of bounds");
            throw e;
          }
        };
        this.addTab = function(tab, index) {
          $scope.tabs.push(tab);
          if ($scope.tabs.length === 1) return $scope.selectTab(tab);
        };
        this.removeTab = function(tab) {
          return $timeout(function() {
            return $scope.tabs.splice($scope.tabs.indexOf(tab, 1));
          });
        };
        this.nextTab = function() {
          var newIdx;
          newIdx = $scope.selectedIdx + 1;
          return $scope.changeTab(newIdx);
        };
        return this.previousTab = function() {
          var newIdx;
          newIdx = $scope.selectedIdx - 1;
          return $scope.changeTab(newIdx);
        };
      };
      return {
        restrict: 'E',
        transclude: true,
        controller: controllerFn,
        template: "<div class=\"tabbable\">\n	<ul class=\"nav nav-tabs\">\n		<li ng-repeat=\"tab in tabs\" ng-class=\"{active: tab.selected()}\">\n			<a href=\"\" ng-click=\"selectTab(tab)\">{{tab.title}}</a>\n		</li>\n	</ul>\n	<div class=\"tab-content\" ng-transclude>\n	</div>\n</div>"
      };
    }
  ]).directive('strapTab', [
    function() {
      var linkFn, nextTab;
      nextTab = 0;
      linkFn = function(scope, elm, attrs, container) {
        var tab;
        tab = {
          title: scope.title,
          selected: function(newVal) {
            if (newVal == null) return scope.selected;
            return scope.selected = newVal;
          }
        };
        container.addTab(tab);
        return scope.$on('$destroy', function() {
          return container.removeTab(tab);
        });
      };
      return {
        restrict: 'E',
        transclude: true,
        require: '^strapTabs',
        link: linkFn,
        scope: {
          title: '='
        },
        template: "<div class=\"tab-pane\" ng-class=\"{active:selected}\" ng-show=\"selected\" ng-transclude></div>"
      };
    }
  ]).directive('nextTab', [
    function() {
      var linkFn;
      linkFn = function(scope, element, attrs, container) {
        return element.bind('click', function() {
          return container.nextTab();
        });
      };
      return {
        link: linkFn,
        restrict: 'A',
        require: '^strapTabs'
      };
    }
  ]).directive('prevTab', [
    function() {
      var linkFn;
      linkFn = function(scope, element, attrs, container) {
        return element.bind('click', function() {
          return container.previousTab();
        });
      };
      return {
        link: linkFn,
        restrict: 'A',
        require: '^strapTabs'
      };
    }
  ]);

}