function() {

        $resource('../GameApi/turns/:id/:since.json').get({id: $scope.game.id, since: $scope.lastTurnTime || $scope.game.created}, function(result) {

            var newTurns = $.map(result.turns, function(item) {

                var turn = parseTurn(item);

                makeTurn(turn);

                if($scope.lastTurn === null || turn.createdDate.valueOf() > $scope.lastTurn.createdDate) {

                    $scope.lastTurn = turn;

                    $scope.isMyTurn = !turn.isMine;

                    $scope.lastTurnTime = $scope.lastTurn.createdDate;

                }



                return turn;

            });



            Array.prototype.push.apply($scope.turns, newTurns);

            $timeout(getTurns, 1000);

        });

    }