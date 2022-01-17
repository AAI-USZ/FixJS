function (event) {
                    var i, numGamesRemaining, schedule;

                    // numGamesRemaining doesn't need to be calculated except for g.userTid, but it is.
                    schedule = event.target.result;
                    numGamesRemaining = 0;
                    for (i = 0; i < schedule.length; i++) {
                        if (tid === schedule[i].homeTid || tid === schedule[i].awayTid) {
                            numGamesRemaining += 1;
                        }
                    }

                    g.dbl.transaction(["players"]).objectStore("players").index("tid").getAll(tid).onsuccess = function (event) {
                        var players, playersAll;

                        playersAll = event.target.result;

                        players = getPlayers(playersAll, numGamesRemaining);
                        cb(players);
                    };
                }