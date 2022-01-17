function(datajson, $filter) {
    var directiveDefinitionObject;
    directiveDefinitionObject = {
      require: '?ngModel',
      link: function(scope, el, tAttrs, controller) {
        controller.$setViewValue = function(val) {
          var basiccolors;
          basiccolors = $filter("nameType")(scope.data, "basiccolor");
          $(el).typeahead({
            source: basiccolors,
            updater: function(val) {
              var colorsonly, r;
              colorsonly = $filter("typevalue")(scope.data, "color", "basiccolor");
              r = colorsonly[val.substr(1)];
              if (r) {
                el.css("background", r);
              }
              return controller.$viewValue.value = val;
            },
            items: 11
          });
          return controller.$viewValue.value = val;
        };
        return controller.$render = function() {
          var a, colorsonly, r;
          el.val(controller.$viewValue.value || '');
          a = controller.$viewValue;
          switch (a.type) {
            case "color":
            case "basiccolor":
              el.width("80px");
              if (a.value[0] !== "@") {
                el.css("background", a.value);
              }
              if (a.value[0] === "@") {
                colorsonly = $filter("typevalue")(scope.data, "color", "basiccolor");
                r = colorsonly[a.value.substr(1)];
                if (r) {
                  return el.css("background", r);
                }
              }
          }
        };
      }
    };
    return directiveDefinitionObject;
  }