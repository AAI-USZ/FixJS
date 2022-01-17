function() {
    if (!$routeParams.gameId) {
      $location.path('/lobby');
      return;
    }

    $scope.letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    $scope.colorClasses = {
      1: 'red',
      2: 'green',
      3: 'blue'
    };

    socket.setHandler('game', function(data) {
      if (data.error) {
        $scope.error = 'Error loading game: ' + data.error;
        return;
      } else {
        var oldLetters, oldNotes;
        if ($scope.lettersDirty) {
          oldLetters = $scope.game.me.alphabet;
        }
        if ($scope.notesDirty) {
          oldNotes = $scope.game.me.notes;
        }

        $scope.game = data;
        $scope.tables = [
          { id: 'meTable', title: 'You', table: data.me },
          { id: 'themTable', title: data.them.displayName, table: data.them }
        ];

        if ($scope.lettersDirty) {
          $scope.game.me.alphabet = oldLetters;
        }
        if ($scope.notesDirty) {
          $scope.game.me.notes = oldNotes;
        }
      }
    });

    $scope.refresh = function() {
      socket.send('game', { id: $routeParams.gameId });
    };
    // Immediately send a refresh on loading.
    $scope.refresh();
    // And then set up refreshes every 10 seconds.
    var GAME_INTERVAL = 10000; // TODO Lower the frequency to every 20 or 30 seconds once the server will send push updates on guesses.
    $window.setInterval($scope.refresh, GAME_INTERVAL);

    $scope.clickLetter = function(letter) {
      $scope.lettersDirty = true;
      $scope.handleDirty();

      var newNumber = $scope.game.me.alphabet[letter];
      newNumber = newNumber ? (newNumber + 1) % 4 : 1;
      $scope.game.me.alphabet[letter] = newNumber;
    };

    $scope.notesChanged = function() {
      $scope.notesDirty = true;
      $scope.handleDirty();
    };

    var timer;
    var UPDATE_PERIOD = 2000; // 2 seconds from last edit to saving.
    $scope.handleDirty = function() {
      if (timer) {
        $window.clearTimeout(timer);
        timer = 0;
      }

      $window.setTimeout($scope.sendUpdate, UPDATE_PERIOD);
    };

    $scope.doGuess = function() {
      if ($scope.guess && $scope.guess.length == 5) {
        $scope.sendUpdate($scope.guess);
      } else {
        $scope.error = 'Invalid guess word';
      }
    };

    $scope.sendUpdate = function(opt_guess) {
      if (timer) {
        $window.clearTimeout(timer);
        timer = 0;
      }

      var payload = {
        id: $routeParams.gameId
      };

      if (opt_guess) {
        payload.guess = opt_guess;
      }
      if ($scope.lettersDirty) {
        payload.alphabet = $scope.game.me.alphabet;
      }
      if ($scope.notesDirty) {
        payload.notes = $scope.game.me.notes;
      }

      socket.setHandler('update', function(data) {
        if (data.error) {
          $scope.error = data.error;
        } else {
          if (opt_guess) {
            $scope.game.me.guesses.push({
              word: opt_guess,
              correct: data.correct
            });
          }

          $scope.notesDirty = false;
          $scope.lettersDirty = false;
        }
      });
      socket.send('update', payload);
    };

  }