function(scope, element, attrs, controller) {
        var opts, originalRender, updateModel, usersOnSelectHandler;
        opts = angular.extend({}, options, scope.$eval(attrs.uiDate));
        /* If we have a controller (i.e. ngModelController) then wire it up
        */

        if (controller != null) {
          updateModel = function(value, picker) {
            return scope.$apply(function() {
              return controller.$setViewValue(element.datepicker("getDate"));
            });
          };
          if (opts.onSelect != null) {
            /* Caller has specified onSelect to call this as well as updating the model
            */

            usersOnSelectHandler = opts.onSelect;
            opts.onSelect = function(value, picker) {
              updateModel(value);
              return usersOnSelectHandler(value, picker);
            };
          } else {
            /* No onSelect already specified so just update the model
            */

            opts.onSelect = updateModel;
          }
          /* Update the date picker when the model changes
          */

          originalRender = controller.$render;
          controller.$render = function() {
            originalRender();
            return element.datepicker("setDate", controller.$viewValue);
          };
        }
        /* Create the datepicker widget
        */

        return element.datepicker(opts);
      }