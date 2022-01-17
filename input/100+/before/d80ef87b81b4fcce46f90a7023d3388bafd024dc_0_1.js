function Main($scope){
  
  $scope.name = '';
  $scope.text = '';
  $scope.messages = {};
  
  
  $scope.addMessage = function() {
    firebase.push({Title: $scope.name, Content: "请输入文字"});
    $scope.text = '';
  };
  
  $scope.saveText = function() {
    firebase.push({Title: "testing", Content: "请输入文字"});
    $scope.text = '';
  };
  
  firebase.on('value', function(snapshot) {
    //var message = snapshot.val();
    //$scope.messages.push({name: message.Title, text: message.Content});
    console.log(snapshot.val());
    $scope.messages=snapshot.val();
    if (!$scope.$$phase) $scope.$apply();
  });
}