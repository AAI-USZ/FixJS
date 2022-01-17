function getPlayers(playersAll, numGamesRemaining) {
                var i, j, pa, player, players, pr, ps;

                players = [];
                for (i = 0; i < playersAll.length; i++) {
                    pa = playersAll[i];

                    // Attributes
                    player = {pid: pa.pid, name: pa.name, pos: pa.pos, age: season - pa.bornYear, contractAmount: pa.contractAmount / 1000, contractExp: pa.contractExp, cashOwed: ((1 + pa.contractExp - g.season) * pa.contractAmount - (1 - numGamesRemaining / 82) * pa.contractAmount) / 1000};

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
                    ps = undefined;
                    for (j = 0; j < pa.stats.length; j++) {
                        if (pa.stats[j].season === season && pa.stats[j].playoffs === false && pa.stats[j].tid === tid) {
                            ps = pa.stats[j];
                            break;
                        }
                    }

                    // Only show a player if they have a stats entry for this team and season, or if they are rookies who have just been drafted and the current roster is being viewed.
                    if (typeof ps !== "undefined" || (pa.draftYear === g.season && season === g.season)) {
                        if (typeof ps !== "undefined" && ps.gp > 0) {
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
                }

                return players;
            }