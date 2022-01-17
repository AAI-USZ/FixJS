function Main($scope){
  
  $scope.name = '';
  $scope.text = '';
  $scope.messages = {};
  $scope.types=["文字","图片"];
  $scope.type="文字";
  $scope.pages=[];

  var router=function(scope){
	hash=scope.hash=location.hash.replace("#","");
	scope.home=hash=="";
	//alert($scope.hash+$scope.home.toString());
	if(scope.hash){
	   document.title=scope.hash;
	   firebase = new Firebase('http://demo.firebase.com/edukms/'+$scope.hash);
	}
  } 
  window.onhashchange=router($scope);
  router($scope);
  
  $scope.addMessage = function() {
  	switch($scope.type){
  	case "文字":
  		firebase.push({Title: $scope.name, Content: "请输入文字", type:"text"});
  		break;
  	case "图片":
  		firebase.push({Title: $scope.name, url: "http://placekitten.com/200/300", type:"image"});
		break;
  	}
    $scope.text = '';
  };
  
  $scope.setText = function(key,sec) {
    firebase.child(key).child('Content').set(sec.Content);
    sec.edit=false;
    $scope.$apply();
  };
  
  $scope.setImage= function(key,value) {
  	var url=prompt("输入URL",value);
  	if (url) {
    	firebase.child(key).child('url').set(url);
    	$scope.$apply();
  	}
  };
  
  $scope.setTemplate= function(type){
  	var template={"class":{
  		0:{
  			"Title":"课件",
  			"type":"image",
  			"url":"http://i.t.com.com/i/lumiere/2009/01/06/9n0106_Keynote09-50004870-20090106_145227-320x240.jpg"
  		},
  		1:{
  			"Title":"作业",
  			"type":"text",
  			"Content":"今天的作业是1+1=?"
  		},
  		2:{
  			"Title":"相关文档",
  			"type":"text",
  			"Content":"XXXX"
  		}
  		},
  		"point":{
  		0:{
  			"Title":"难点／重点",
  			"type":"text",
  			"Content":"本知识点的难点是。。。"
  		},
  		1:{
  			"Title":"图片库",
  			"type":"image",
  			"url":"http://i.t.com.com/i/lumiere/2009/01/06/9n0106_Keynote09-50004870-20090106_145227-320x240.jpg"
  		},
  		2:{
  			"Title":"相关文档",
  			"type":"text",
  			"Content":"XXXX"
  		}
  		}
  	};
  	firebase.set(template[type]);
  }
  
  $scope.deleteSection = function(key) {
    firebase.child(key).remove();
    $scope.$apply();
  };
  
  firebase.on('value', function(snapshot) {
    //var message = snapshot.val();
    //$scope.messages.push({name: message.Title, text: message.Content});
    console.log(snapshot.val());
    $scope.messages=snapshot.val();
    if (!$scope.$$phase) $scope.$apply();
  });
  browse.on('value', function(snapshot) {
    //var message = snapshot.val();
    //$scope.messages.push({name: message.Title, text: message.Content});
    var pages=[];
    snapshot.forEach(function(snapshot){
    	pages.push(snapshot.name());	
    });
    $scope.pages=pages;
    if (!$scope.$$phase) $scope.$apply();
  });
}