function() {
  /*
  @reference ../jquery-1.7.2.js
  @reference ../angular.js
  */
  var aaaController, menu, module;
  module = angular.module("bootstrapApp", []);
  module.config(function($routeProvider, $provide, $filterProvider) {
    $filterProvider.register('nameType', function() {
      return function(data, type, name) {
        var key, prop, x;
        x = [];
        for (key in data) {
          prop = data[key];
          if (prop.type === type && key.indexOf(name.substr(1)) !== -1) {
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
  menu = function(element, options) {
    var e, obj, template;
    e = element;
    template = '<ul class="typeahead dropdown-menu"><li>xxx</li></ul>';
    obj = {};
    obj.show = function() {
      return console.log("obj", e);
    };
    return obj;
  };
  module.directive("bootstrapelem", function(datajson, $filter) {
    var directiveDefinitionObject;
    directiveDefinitionObject = {
      controller: function($scope, $element) {
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
      },
      require: '?ngModel',
      link: function(scope, el, tAttrs, controller) {
        console.log(scope, controller);
        return controller.$render = function() {
          return el.val(controller.$viewValue.value);
        };
      }
    };
    return directiveDefinitionObject;
  });
  aaaController = function($scope, $http) {};
  1;
}