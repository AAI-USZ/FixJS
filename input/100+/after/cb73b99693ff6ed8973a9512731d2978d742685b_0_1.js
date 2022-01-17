function() {
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(

                function (position) {
                    $scope.myLatitude=position.coords.latitude;
                    $scope.myLongitude=position.coords.longitude;

                    mapServiceProvider($scope.myLatitude,$scope.myLongitude,$scope.IDmapa,$scope.fltr_zoom);
                },
                function (error)
                {
                    switch(error.code)
                    {
                        case error.TIMEOUT:
                            alert ('Timeout');
                            break;
                        case error.POSITION_UNAVAILABLE:
                            alert ('Position unavailable');
                            break;
                        case error.PERMISSION_DENIED:
                            alert ('Permission denied');
                            break;
                        case error.UNKNOWN_ERROR:
                            alert ('Unknown error');
                            break;
                    }
                }
            );
        }else{
            mapServiceProvider($scope.fltr_latNS,$scope.fltr_longNS,$scope.IDmapa,$scope.fltr_zoom);
        }

    }