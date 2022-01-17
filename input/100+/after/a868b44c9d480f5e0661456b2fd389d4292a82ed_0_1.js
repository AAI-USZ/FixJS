function($scope, $element) {
        return $scope.test = function($event) {
          var all, basiccolors, item;
          all = $scope.$parent.data;
          console.log($scope);
          item = $scope.bootstrapelem;
          basiccolors = $filter("nameType")(all, "basiccolor", item.value);
          $($element).typeahead({
            source: basiccolors,
            updater: function(val) {
              $scope.bootstrapelem.value = val;
              return console.log($scope.bootstrapelem, "aaa", val);
            },
            items: 11
          });
          return 1;
        };
      }