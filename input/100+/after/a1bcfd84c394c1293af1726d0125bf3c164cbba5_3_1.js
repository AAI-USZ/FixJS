function($scope, $http, appSettings) {
    var converter, self, toHtml;
    novinka.$inject = ["$scope", "$http", "appSettings"];
    $scope.item = $scope.$parent.data;
    $scope.data.Content = angular.fromJson($scope.item.Content) || {
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
      return toHtml($scope.item.Content.header);
    };
    $scope.textHtml = function() {
      return toHtml($scope.item.Content.text);
    };
    $scope.thumb = function() {
      return $scope.item.thumb;
    };
    return $scope.add = function() {};
  }