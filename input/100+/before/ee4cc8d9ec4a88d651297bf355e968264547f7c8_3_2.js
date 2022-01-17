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
/*        pr.ovr, pr.pot

        AVG(ps.min) as min, AVG(ps.pts) as pts, AVG(ps.orb + ps.drb) as trb, AVG(ps.ast) as ast

        FROM player_attributes as pa LEFT OUTER JOIN player_ratings as pr ON pr.season = :season AND pa.pid = pr.pid LEFT OUTER JOIN player_stats as ps ON ps.season = :season AND ps.playoffs = FALSE AND pa.pid = ps.pid WHERE pa.tid = :tid GROUP BY pa.pid, pr.pid, pr.season ORDER BY pa.roster_order ASC', season=view_season, numGamesRemaining=numGamesRemaining, tid=tid)
                }*/

                    g.dbl.transaction(["players"]).objectStore("players").index("tid").getAll(tid).onsuccess = function (event) {
                        var j, pa, player, players, playersAll, pr, ps;

                        playersAll = event.target.result;
                        players = [];
                        for (i = 0; i < playersAll.length; i++) {
                            pa = playersAll[i];

                            // Attributes
                            player = {pid: pa.pid, name: pa.name, pos: pa.pos, age: g.season - pa.bornYear, contractAmount: pa.contractAmount / 1000, contractExp: pa.contractExp, cashOwed: ((1 + pa.contractExp - g.season) * pa.contractAmount - (1 - numGamesRemaining / 82) * pa.contractAmount) / 1000};

                            // Ratings
                            for (j = 0; j < pa.ratings.length; j++) {
                                if (pa.ratings[j].season === season) {
                                    pr = pa.ratings[j];
                                    break;
                                }
                            }
                            player.ovr = pr.ovr;
                            player.pot = pr.pot;

                            // Stats
                            for (j = 0; j < pa.stats.length; j++) {
                                if (pa.stats[j].season === season && pa.stats[j].playoffs === false) {
                                    ps = pa.stats[j];
                                    break;
                                }
                            }
                            if (ps.gp > 0) {
                                player.min = ps.min / ps.gp;
                                player.pts = ps.pts / ps.gp;
                                player.trb = ps.trb / ps.gp;
                                player.ast = ps.ast / ps.gp;
                            } else {
                                player.min = 0;
                                player.pts = 0;
                                player.trb = 0;
                                player.ast = 0;
                            }

                            players.push(player);
                        }

                        cb(players);
                    }                };
