function() {
    var user = Parse.User.current();
    if (!user) {
      user = new Parse.User();
    } 
    user.set("username", $scope.email);
    if ($scope.password) {
      user.set("password", $scope.password);
    }
    user.set("email", $scope.email);
    user.set("limit", $scope.limit);
    user.signUp(null, {
      success: function(user) {
        location.reload();
      },
      error: function(user, error) {
        $scope.$apply(function() {
          $scope.accountError = "Looks like you've already signed up, no? Try logging in.";
        });
      }
    });
  }