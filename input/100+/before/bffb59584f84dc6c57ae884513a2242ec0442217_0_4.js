function(result) {

            $scope.game = result.game;

            $scope.player = result.player;



            $scope.game.challenger = result.challenger;

            $scope.game.opponent = result.opponent;

			

			var tz = new Date();

			$scope.game.expires =  parseInt($scope.game.expires, 10)*1000 + (tz.getTimezoneOffset()*60)*1000;

			$scope.game.created = Date.fromSqlFormat($scope.game.created);

			

            $scope.lastTurnTime = $scope.game.created;

			

            $scope.isObservingOnly = $scope.game.challenger_id == window.currentUserId || $scope.game.opponent_id == window.currentUserId;

			

			$timeout(triggerExpires, 1000);

            checkOnline();

            getTurns();

        }