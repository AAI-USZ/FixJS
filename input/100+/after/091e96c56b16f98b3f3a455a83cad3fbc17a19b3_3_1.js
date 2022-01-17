function($scope, element, attrs, controller) {
        /* We override the render method to run the jQuery mask plugin
        */
        controller.$render = function() {
          var value;
          value = controller.$viewValue || '';
          element.val(value);
          return element.mask($scope.uiMask);
        };
        /* Add a parser that extracts the masked value into the model but only if the mask is valid
        */

        controller.$parsers.push(function(value) {
          var isValid;
          isValid = element.data('mask-isvalid');
          controller.$setValidity('mask', isValid);
          return element.mask();
        });
        /* When keyup, update the viewvalue
        */

        return element.bind('keyup', function() {
          return $scope.$apply(function() {
            return controller.$setViewValue(element.mask());
          });
        });
      }