function text($scope, $http, appSettings) {
	$scope.item = $scope.$parent.item; 
	console.log("text controller", $scope);
}