function reSyncGameStatusWithServer() {
    $.ajax({
        url:document.URL + '/status',
        success:function (data) {
            // resync the time left
            previousTimeLeft = data.game.timeLeft;
            if (data.game.percentageDone <= 0) {
                $(window).trigger(EVENT_GAME_TIMEUP);
            }
            else {
                setTimeout(reSyncGameStatusWithServer, SERVER_POLLING_REPEAT_TIME);
            }
        },
        statusCode:{
            410:function () {
                //alert("The game you asked is finished .... ");
                $(window).trigger(EVENT_GAME_TIMEUP);
            }
        }
    });
}