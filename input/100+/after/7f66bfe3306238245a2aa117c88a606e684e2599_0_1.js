function ($scope, $resource, $location) {

    // Check just in case
    $scope.getFiltered = function getFiltered(area) {

        var fullUrl = $location.absUrl();

        var baseUrl = $location.protocol() + '://' + $location.host();
        var path    = fullUrl.replace(baseUrl, '');
        var getPath = '';

        var getSort = '';

        switch (path) {
            case '/awards':
                getPath = path + '/get/' + area;
                break;
            case '/players':
                getPath = path + '/get';
                getSort = 'name';
                break;
            case '/episodes':
                getPath = path + '/get';
                getSort = '-airDate';
                break;
            case '/':
                getPath = '/awards/get/0/5';
                break;
       }

        if (path != '') {
            $scope.res       = $resource(getPath);
            $scope.data      = $scope.res.get();
            $scope.area      = area;
            $scope.predicate = getSort;
        }
    }

    $scope.getFiltered(0);
}