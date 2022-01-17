function EditPostCtrl($scope , $log, $location, $routeParams, PostSrv, PostRes){
    $log.info('EditPostCtrl');
    $scope.PostSrv = PostSrv;
    $scope.post = PostRes.get({id: $routeParams.postId});
}