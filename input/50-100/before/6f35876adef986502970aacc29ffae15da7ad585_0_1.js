function(val, key) {
            $scope.transactions.push(val.attributes.amount);
            $scope.current += val.attributes.amount;
          }