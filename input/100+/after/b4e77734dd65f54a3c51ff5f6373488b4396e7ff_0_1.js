function(data) { 
            delete $scope.loading;

            $scope.feed = $atom2json(data).feed;
            document.title = $scope.feed.title;

            if (typeof $scope.feed._modules.opensearch !== "undefined") {
               var os = $scope.feed._modules.opensearch,
                   total = os.totalResults / os.itemsPerPage;
               $scope.opensearch = {
                  current: os.startIndex,
                  results: os.totalResults,
                  total: Math.floor(total) === total ? total : Math.floor(total) + 1,
                  offset: (os.startIndex-1) * os.itemsPerPage,
                  perpage: os.itemsPerPage
               };
            } 
         }