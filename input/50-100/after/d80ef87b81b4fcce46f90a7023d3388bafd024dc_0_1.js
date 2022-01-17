function() {
  	switch($scope.type){
  	case "文字":
  		firebase.push({Title: $scope.name, Content: "请输入文字", type:"text"});
  		break;
  	case "图片":
  		firebase.push({Title: $scope.name, url: "http://placekitten.com/200/300", type:"image"});
		break;
  	}
    $scope.text = '';
  }