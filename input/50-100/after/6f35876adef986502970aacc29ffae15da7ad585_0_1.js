function(val, key) {
            transDate = new Date(val.createdAt);
            if (transDate.getMonth() == thisMonth) {
              $scope.transactions.push(val.attributes.amount);
              $scope.current += val.attributes.amount;
            }
          }