function() {
          var value;
          value = controller.$viewValue || '';
          element.val(value);
          return element.mask($scope.uiMask);
        }