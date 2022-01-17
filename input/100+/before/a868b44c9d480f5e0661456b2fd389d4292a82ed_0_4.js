function() {
  /*
  @reference ../jquery-1.7.2.js
  @reference ../angular.js
  */
  var aaaController, module;
  module = angular.module("bootstrapApp", []);
  module.config(function($routeProvider, $provide, $filterProvider) {
    $filterProvider.register('nameType', function() {
      return function(data, type, name) {
        var key, prop, x;
        x = [];
        for (key in data) {
          prop = data[key];
          if (prop.type === type) {
            x.push("@" + key);
          }
        }
        return x;
      };
    });
    $filterProvider.register('typevalue', function() {
      return function(data, type, type2) {
        var key, prop, x;
        x = {};
        for (key in data) {
          prop = data[key];
          if (prop.type === type || prop.type === type2 && prop.value[0] !== "@") {
            x[key] = prop.value;
          }
        }
        return x;
      };
    });
    $filterProvider.register('refs', function() {
      return function(data, type) {
        var key, prop, x;
        x = {};
        for (key in data) {
          prop = data[key];
          if (prop.type === type && prop.value[0] === "@") {
            x[key] = prop.value;
          }
        }
        return x;
      };
    });
    $provide.factory("datajson", function() {
      var d;
      d = $.parseJSON(angular.element("html").data("modeldata"));
      return d;
    });
    $provide.factory("colorsonly", function($filter, datajson) {
      var a;
      a = $filter("typevalue")(datajson, "color");
      return a;
    });
    return $routeProvider.when("/csstest", {
      controller: aaaController,
      templateUrl: "/Content/csstest.html"
    }).when("/bootswatch", {
      controller: aaaController,
      templateUrl: "/Content/bootswatch.html"
    }).otherwise({
      redirectTo: '/csstest'
    });
  });
  module.directive("bootstrapelem", function(datajson, $filter) {
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
  });
  aaaController = function($scope, $http) {};
  1;
}