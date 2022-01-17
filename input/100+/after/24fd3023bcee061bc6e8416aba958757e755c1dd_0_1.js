function() {
    if (!$scope.loggedIn) {
      user = new Parse.User();
      user.set("password", $scope.password);
    } 

    user.set("username", $scope.email);
    user.set("email", $scope.email);
    user.set("limit", $scope.limit);

    if ($scope.loggedIn) {
      user.save(null, {
        success: function(user) { location.reload(); },
        error: function(user, error) {
          $scope.$apply(function() {
            $scope.accountError = "Error: " + error.message;
          });
        }
      });
    } else {
      user.signUp(null, {
        success: function(user) { location.reload(); },
        error: function(user, error) {
          $scope.$apply(function() {
            $scope.accountError = "Error: " + error.message;
          });
        }
      });
      
    }
  }