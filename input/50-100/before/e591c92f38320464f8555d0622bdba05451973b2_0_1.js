function() {

		if(window.isGast)

			return;

		

        $resource(window.webroot + 'GameApi/makeMatch.json').save(function(result) {

            if (result.await != null) {

                $timeout(makeMatch, 5000);

                return;

            }



            $scope.isMyTurn = true;



            loadGame(result.game_id);

        });

    }