function() {
    var trans = new Transaction();
    trans.set("amount", $scope.amount);
    trans.set("user", user);
    $scope.transactions.unshift(trans);
    $scope.current = $scope.current + $scope.amount;
    $scope.message = "Transaction for $" + $scope.amount.toFixed(2) + " saved.";
    $scope.amount = "";
    trans.save(null, {
      error: function(transaction, error) {
        alert("Oops, that didn't work. Reload the page and try again, maybe?");
      }
    });
  }