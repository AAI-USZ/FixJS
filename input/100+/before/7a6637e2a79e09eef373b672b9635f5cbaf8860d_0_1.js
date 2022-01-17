function UserCtrl($scope) {
  Parse.initialize("hCnt4S3bcWaZRDUQxoz4knP8KvYncQ4UGkwqwIq1", "PrQttkfi0FHWEQwoBt3iMFX2BkqVOBpwlyS0BQB6");
  $scope.loggedIn = Parse.User.current();

  $scope.login = function() {
    Parse.User.logIn($scope.email, $scope.password, {
      success: function(user) {
        $scope.$apply(function() {
          $scope.loggedIn = true;
          $('#loginForm').modal('hide');
        });
      },
      error: function(user, error) {
        $scope.$apply(function() {
          $scope.loginError = 'Incorrect login information.';
        });
      }
    });
  }

  $scope.logout = function() {
    Parse.User.logOut();
    $scope.loggedIn = false;
  }

  $scope.saveUser = function() {
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
        $scope.$apply(function() {
          $scope.loggedIn = true;
          $('#accountForm').modal('hide');
        });
      },
      error: function(user, error) {
        $scope.$apply(function() {
          $scope.loginError = 'Incorrect login information.';
        });
      }
    });
  }
}