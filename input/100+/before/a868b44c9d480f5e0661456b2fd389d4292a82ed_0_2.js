function() {
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
        }