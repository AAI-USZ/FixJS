function(result) {

            if (result.await != null) {

                $timeout(makeMatch, 5000);

                return;

            }



            $scope.isMyTurn = true;

            $scope.waitingForOpponent = false;



            loadGame(result.game_id);

        }