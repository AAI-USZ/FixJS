function initListeners(){
    setUpGameControlHandlers();

    setUpHeaderShortcuts();

    setUpHelpAndTooltips();

    var $robotOfObjective = $("#robotForObjective");
    //select the robot correspounding to the objective on page load
    $robotOfObjective.addClass("selected");

    connectPlayer();

    gameIsOn = true;

    // when leaving the window, disconnect the user
    window.onbeforeunload = function() {
        // the game is finished ... just disconnect
        if(!gameIsOn){ // no game is playing ... no need to ask confirmation before leaving
            return
        }
        return $_("game.leave.gameIsActive.confirm")
        // should probably ask confirmation to user ??
    };

    // launch the client-site countdown (frequent updates)
    // launch the server polling to resync timer and game status (less frequent)
    doRefreshLoop();
    reSyncGameStatusWithServer();

    // game event listeners
    var $window = $(window);
    // events going on in the game ?
    $window.on(REQUEST_ROBOT_MOVE, function(e, direction, color){
        //console.debug(e.type, e.namespace, direction, color);
        moveRobot(color, directionStringToCode(direction));//keepHistory
    });

    /*$window.on(EVENT_ROBOT_MOVING, function(e, direction, color){
        console.debug(e.type, e.namespace, direction, color);
    });
    $window.on(EVENT_ROBOT_MOVED, function(e, direction, color){
        console.debug(e.type, e.namespace, direction, color);
    });*/

    // do it only once
    $window.one(EVENT_GAME_TIMEUP, function(e){
        //console.debug(e.type, e.namespace);
        gameIsOn = false; // it's ok to leave the page, now
        $("#endOfGameModal").modal('show');
        $("#winModal").modal('hide');
    });

    $window.on(EVENT_GAME_SOLVED, function(e, numberOfMoves){
        //console.debug(e.type, e.namespace, numberOfMoves);
        //win modal shown does not imply redirection
        //no need to deactivate leaveGame on unload
        //window.onunload = null;// to prevent call to leaveGame() (see registration in javascript in initListeners())
        $("#winModal").modal('show');
    });
}