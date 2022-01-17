function(val) {
              var colorsonly, r;
              colorsonly = $filter("typevalue")(scope.data, "color", "basiccolor");
              r = colorsonly[val.substr(1)];
              if (r) {
                el.css("background", r);
              }
              return controller.$viewValue.value = val;
            }