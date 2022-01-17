function GameViewModel(

$scope, $resource, $filter, $timeout, gamemaths) {



    $scope.turns = [];

    $scope.waitingForOpponent = true;

    $scope.isMyTurn = false;

    $scope.lastTurn = null;

    $scope.lastTurnTime = null;

    $scope.isObservingOnly = true;

    $scope.grid = Array.range(0,gamemaths.gridSize * gamemaths.gridSize, function(i){

        return null;

    });

	

    var initialize = function() {

        if (window.gameId != null) {

            loadGame(window.gameId);

        }else {

            makeMatch();

        }

    }



    var getTurns = function() {

        // since = $filter('date')(

        //    $scope.lastTurnTime || $scope.game.created, 'yyyy-MM-dd HH:mm:ss');



        $resource(window.webroot + 'GameApi/turns/:id/:since.json').get({

            id: $scope.game.id,

            since: ($scope.lastTurnTime || $scope.game.created).getUnix(),

            timestamp: new Date}, function(result) {

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

        });

    }



    var checkOnline = function() {

        var lastTurnTime =  $scope.lastTurnTime.valueOf();

        $timeout(function() {

            if ($scope.lastTurnTime.valueOf() == lastTurnTime) {

                console.log('checking if players are still online...');

                $resource(window.webroot + 'GameApi/detail/:id.json').get({id: $scope.game.id}, function(result) {

                    $scope.game.challenger.online = result.challenger.online;

                    $scope.game.opponent.online = result.opponent.online;



                    checkOnline();

                });

            }

        }, 30000);

    }



    var loadGame = function(gameId, silent) {

        $resource(window.webroot + 'GameApi/detail/:id.json').get({id: gameId}, function(result) {

            $scope.game = result.game;

            $scope.player = window.currentUserId;

			

            $scope.game.challenger = result.challenger;

            $scope.game.opponent = result.opponent;

			

			var tz = new Date();

			$scope.game.expires =  parseInt($scope.game.expires, 10)*1000 + (tz.getTimezoneOffset()*60)*1000;

			$scope.game.created = Date.fromSqlFormat($scope.game.created);

			

			

			

            $scope.lastTurnTime = $scope.game.created;



            $scope.isObservingOnly = $scope.game.challenger_id != $scope.player

                && $scope.game.opponent_id != $scope.player;

            console.log($scope.isObservingOnly)

			

			

            $scope.waitingForOpponent = false;

			

			if(!silent) {

				$timeout(triggerExpires, 1000);

				checkOnline();

				getTurns();

			}

			

        });

    };

	

	var triggerExpires = function() {

		var t = $scope.game.expires - 1000;

		

		if(t>=0) {

			$scope.game.expired = new Date(t);

			$scope.game.expires = t;

			$timeout(triggerExpires, 1000);

		}else

			$scope.game.expired = null;

	};

	

	

    var makeMatch = function() {

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

    };



    var parseTurn = function(item) {

        return {

            x: parseInt(item.Turn.x),

            y: parseInt(item.Turn.y),

            game_id: parseInt(item.Turn.game_id),

            creator: parseInt(item.Turn.creator),

            created: item.Turn.created,

            createdDate: Date.fromSqlFormat(item.Turn.created)

        };

    }



    var isOccupied = function(pos, by) {

        var index = pos.index;

        if (index === null) {

            index = typeof(pos) === 'number' ? pos : getIndex(pos);

        }



        return gamemaths.isOccupied($scope.grid, index, by);

    }



    var getPosition = function(index) {

        return gamemaths.getPosition(index);

    }



    var getIndex = function(turn) {

        return gamemaths.getIndex(turn);

    };



    var findAdjacentRows = function() {

        $.each(arguments, function(i, turn){

            gamemaths.findAdjacentRows($scope.grid, turn);

        });



    };



    var makeTurn = function(turn) {

		var index = getIndex(turn);

        turn.index = index;

		

		if(window.isGast)

			turn.isMine = false;

		else

			turn.isMine = turn.creator == $scope.player;

		

        turn.isChallenger = turn.creator == $scope.game.challenger_id;

        

		//console.log(turn.isChallenger);

        

		turn.completedLines = [];

        if(isOccupied(turn)) {

            return false;

        }



        if (!turn.createdDate.isValid()) {

            console.log('invalid created date', turn);

        }



        if($scope.lastTurn === null || turn.createdDate.valueOf() > $scope.lastTurn.createdDate.valueOf()) {

            $scope.lastTurn = turn;

            $scope.isMyTurn = !turn.isMine;

            $scope.lastTurnTime = $scope.lastTurn.createdDate;

        }



        return $scope.grid[index] = turn;



    };



    $scope.getPlayer = function() {

        if ($scope.player == $scope.game.challenger_id) {

            return $scope.game.challenger;

        }



        return $scope.game.opponent;

    };



    $scope.getPlayersOpponent = function() {

        if ($scope.player == $scope.game.challenger_id) {

            return $scope.game.opponent;

        }



        return $scope.game.challenger;

    };



    $scope.place = function(index) {

        if (!$scope.isMyTurn || $scope.isObservingOnly) return;



        var data = getPosition(index);



        var params = {

            id:  $scope.game.id,

            x: data.x.toString(),

            y: data.y.toString()

        };



        $resource(webroot + 'GameApi/place/:id/:x/:y.json', params).get(function(result) {

            makeTurn(parseTurn(result.turn));

            if (result.won === true) {

                $scope.game.completed = true;

                //$scope.game.winner_id = $scope.player;

				loadGame(window.gameId, true);

				

                $.each(result.rows, function(_,row) {

                    $.each(row, function(_, turn) {

                        $scope.grid[getIndex(parseTurn(turn))].completedLines.push(row);

                    });

                });



            }

        });

    };



    $scope.isMarked = function(turn) {

        return turn !== null;

    };



    $scope.hasWon = function() {

        if (!$scope.isCompleted()) return null;

        return $scope.game.winner_id == $scope.player;

    };



    $scope.isCompleted = function() {

        if ($scope.game == null) return false;

        return $scope.game.completed;

    };



    $scope.isPlayerChallenger = function() {

        if ($scope.game == null) return false;



        return ($scope.player == $scope.game.challenger_id);

    }



    $scope.getPlayer = function() {

        if ($scope.game == null) return false;



        if ($scope.isPlayerChallenger()) {

            return $scope.game.challenger;

        }



        return $scope.game.opponent;

    };



    $scope.getPlayersOpponent = function() {

        if ($scope.game == null) return false;



        if ($scope.isPlayerChallenger()) {

            return $scope.game.opponent;

        }



        return $scope.game.challenger;

    };



    $scope.getWinner = function() {

        if (!$scope.isCompleted()) return null;

        return $scope.hasChallengerWon() ? $scope.game.challenger : $scope.game.opponent;

    }



    $scope.hasChallengerWon = function() {

        if ($scope.game == null) return false;

        return $scope.game.winner_id == $scope.game.challenger_id;

    };



    $scope.hasOpponentWon = function() {

        if ($scope.game == null) return false;

        return $scope.game.winner_id == $scope.game.opponent_id;

    };



    $scope.isChallengersTurn = function() {

        if ($scope.lastTurn == null) return false;

        return ($scope.lastTurn.creator == $scope.game.opponent_id);

    };



    $scope.isOpponentsTurn = function() {

        if ($scope.lastTurn == null) return false;

        return ($scope.lastTurn.creator == $scope.game.challenger_id);

    };



    $scope.getTemplate = function() {

        if ($scope.isObservingOnly && !intentionToPlay) {

            return webroot + 'games/viewtemplate';

        }



        return webroot + 'games/playtemplate';

    }



    initialize();

}