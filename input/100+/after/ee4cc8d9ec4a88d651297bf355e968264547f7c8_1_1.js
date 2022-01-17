f                        var cursorP, key, player, playerNewRatings, playerNewStats, r;

                        cursorP = event.target.result;
                        if (cursorP) {
                            player = cursorP.value;

                            // Add row to player ratings
                            playerNewRatings = {};
                            r = player.ratings.length - 1; // Most recent ratings
                            for (key in player.ratings[r]) {
                                if (player.ratings[r].hasOwnProperty(key)) {
                                    playerNewRatings[key] = player.ratings[r][key];
                                }
                            }
                            playerNewRatings.season = g.season;
                            player.ratings.push(playerNewRatings);

/*            // Age players
            pids = []
            r = g.dbex('SELECT pid FROM player_attributes WHERE tid !== :tid', tid=c.PLAYER_RETIRED)
            for pid, in r.fetchall()) {
                pids.push(pid)
            up = player.Player()
            for pid in pids) {
                up.load(pid)
                up.develop()
                up.save()*/
                            // Add row to player stats if they are on a team
                            if (player.tid >= 0) {
                                playerNewStats = {};
                                for (key in player.stats[0]) {
                                    if (player.stats[0].hasOwnProperty(key)) {
                                        playerNewStats[key] = 0;
                                    }
                                }
                                playerNewStats.playoffs = false;
                                playerNewStats.season = g.season;
                                playerNewStats.tid = player.tid;
                                player.stats.push(playerNewStats);
                                player.statsTids.push(player.tid);
                                player.statsTids = _.uniq(player.statsTids);
                            }

                            cursorP.update(player);
                            cursorP.continue();
                        } else {
/*                            // AI teams sign free agents
                            free_agents_auto_sign()*/
                            cb(phase, phaseText);
                        }
                    };
