function($scope, $http, appSettings) {
    var converter, self, toHtml;
    novinka.$inject = ["$scope", "$http", "appSettings"];
    $scope.data = $scope.$parent.item;
    $scope.data.Content = angular.fromJson($scope.data.Content) || {
      header: "",
      text: ""
    };
    converter = new Showdown.converter();
    self = this;
    toHtml = function(markdown) {
      var x;
      x = true;
      if (markdown) {
        return converter.makeHtml(markdown);
      }
    };
    $scope.headerHtml = function() {
      return toHtml($scope.data.Content.header);
    };
    $scope.textHtml = function() {
      return toHtml($scope.data.Content.text);
    };
    $scope.thumb = function() {
      return $scope.data.thumb;
    };
    return $scope.add = function() {};
  }