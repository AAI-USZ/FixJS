function(val, key) {
            transDate = new Date(val.createdAt);
            if (transDate.getMonth() == thisMonth) {
              $scope.transactions.unshift(val);
              $scope.current += val.attributes.amount;
            }
          }