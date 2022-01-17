function GameViewModel($scope, $resource, $timeout, gamemaths) {



    $scope.turns = [];

    $scope.waitingForOpponent = true;

    $scope.isMyTurn = true;

    $scope.lastTurn = null;

    $scope.lastTurnTime = null;

    $scope.grid = Array.range(0,gamemaths.gridSize * gamemaths.gridSize, function(i){

        return null;

    });



    var getTurns = function() {

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



    var makeMatch = function() {

        $resource('../GameApi/makeMatch.json').save(function(result) {

            if (result.await != null) {

                $timeout(makeMatch, 5000);

                return;

            }



            $scope.waitingForOpponent = false;



            $scope.game = result.game.Game;



            getTurns(result);

        });

    };



    makeMatch();



    var parseTurn = function(item) {

        return {

            x: parseInt(item.Turn.x),

            y: parseInt(item.Turn.y),

            game_id: parseInt(item.Turn.game_id),

            creator: parseInt(item.Turn.creator),

            created: item.Turn.created,

            createdDate: new Date(item.Turn.created)

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

            console.log(gamemaths.findAdjacentRows($scope.grid, turn));

        });



    };



    var makeTurn = function(turn) {

        var index = getIndex(turn);

        turn.index = index;

        turn.isMine = turn.creator == $scope.game.challenger_id;

        turn.completedLines = [];

        if(isOccupied(turn)) {

            return false;

        }



        return $scope.grid[index] = turn;



    };



    $scope.place = function(index) {

        var data = getPosition(index);



        var params = {

            id:  $scope.game.id,

            x: data.x.toString(),

            y: data.y.toString()

        };



        console.log('place', index)

        $resource('../GameApi/place/:id/:x/:y.json', params).get(function(result) {

            var turn = makeTurn(parseTurn(result.turn));

            findAdjacentRows(turn);

        });

    };



    $scope.isMarked = function(turn) {

        return turn !== null;

    }

}