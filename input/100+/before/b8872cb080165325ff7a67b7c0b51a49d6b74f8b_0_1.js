function (oldName, newName) {

    // retroactively rename that user's messages
    $scope.messages.forEach(function (message) {
      if (message.user === oldName) {
        message.user = newName;
      }
    });

    // rename user in list of users
    var i;
    for (i = 0; i < $scope.users.length; i++) {
      if ($scope.users[i] === oldName) {
        $scope.users[i] = newName;
      }
    }

    $scope.messages.push({
      user: 'chatroom',
      text: 'User ' + oldName + ' is now known as ' + newName + '.'
    });
  }