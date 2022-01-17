function(result) {

            try {

                var newTurns = $.map(result.turns, function(item) {

                    var turn = parseTurn(item);

                    makeTurn(turn);

                    findAdjacentRows(turn);

                    return turn;

                });



                if (result.winner != null) {

                    $scope.game.completed = true;

                    $scope.game.winner_id = result.winner;

                }



                Array.prototype.push.apply($scope.turns, newTurns);

				

                if ($scope.turns.length == 0) {

                    //$scope.isMyTurn = $scope.player == $scope.game.challenger_id;

                }

            }

            finally {

                $timeout(getTurns, 1000);

            }

        }