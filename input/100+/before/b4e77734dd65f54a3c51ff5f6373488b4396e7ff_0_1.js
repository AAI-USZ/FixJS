function(data) { 
            delete $scope.loading;

            $scope.feed = $atom2json(data).feed;
            document.title = $scope.feed.title;

            if (typeof $scope.feed._modules.opensearch !== "undefined") {
               var os = $scope.feed._modules.opensearch;
               $scope.opensearch = {
                  current: os.startIndex,
                  results: os.totalResults,
                  total: 1^os.totalResults/os.itemsPerPage,
                  offset: (os.startIndex-1) * os.itemsPerPage,
                  perpage: os.itemsPerPage
               };
            } 
         }