function (event) {
                    var players, playersAll;

                    playersAll = event.target.result;

                    players = getPlayers(playersAll, 0);
                    cb(players);
                }