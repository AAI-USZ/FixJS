function (position) {
                    $scope.myLatitude=position.coords.latitude;
                    $scope.myLongitude=position.coords.longitude;

                    mapServiceProvider($scope.myLatitude,$scope.myLongitude,$scope.IDmapa,$scope.fltr_zoom);
                }