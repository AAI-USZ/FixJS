function(transaction) {
    $scope.transactions.splice($scope.transactions.indexOf(transaction), 1);
    $scope.current = $scope.current - transaction.attributes.amount;
    $scope.message = "Transaction for $" + transaction.attributes.amount.toFixed(2) + " deleted.";
    if ($scope.loggedIn) {
      transaction.destroy({
        error: function(transaction, error) {
          alert("Oops, that didn't work. Reload the page and try again, maybe?");
        }
      });
    }
  }