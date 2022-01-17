function(scope, elm, attrs, model) {
          scope.modalName = attrs["ngModel"];
          $(elm).modal({
            backdrop: scope.backdrop,
            keyboard: scope.keyboard,
            show: false
          });
          if (model == null) return;
          scope.$watch(attrs.ngModel, function(value) {
            if (value === true) {
              return $(elm).modal('show');
            } else {
              return $(elm).modal('hide');
            }
          });
          $(elm).bind('shown', function() {
            return $timeout(function() {
              return scope.modalName = true;
            });
          });
          return $(elm).bind('hidden', function() {
            return $timeout(function() {
              return scope.modalName = false;
            });
          });
        }