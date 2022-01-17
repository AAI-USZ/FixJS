function(snapshot) {
    //var message = snapshot.val();
    //$scope.messages.push({name: message.Title, text: message.Content});
    console.log(snapshot.val());
    $scope.messages=snapshot.val();
    if (!$scope.$$phase) $scope.$apply();
  }