function timeStep(oceanName) {
        // Perform one tick of the clock for the simulation oceanName.
        // This entails moving the timer forward one second, checking if that pushes the simulation
        // into the next phase, and asking the bots to perform actions.
        var ocean = oceans[oceanName];
        if (ocean.allPlayersLoaded() && ocean.isNotOver()) {
            if (ocean.isWaiting()) {
                console.log(oceanName + ": Waiting for all players to click on Go Fishing.");
            } else if (ocean.isReadying()) {
                // The "readying" phase happens after everyone said they are ready, and before the simulation runs.
                // The length of the "readying" phase is determined by the "initialDelay" parameter.
                ocean.currentSeconds += 1;
                if (ocean.currentSeconds > ocean.initialDelay) {
                    ocean.status = 'running';
                    // Resetting the chronometer for the new phase
                    ocean.currentSeconds = 0;
                    // Ugly. We know this is the first phase, but the following lines should be reworked.
                    ocean.seasonsData[1].initialFish = ocean.certainFish + ocean.actualMysteryFish;
                    console.log(oceanName + ": Beginning first season.");
                    logs[oceanName] += new Date().toString() + ", Beginning first season.\n";
                    // Can't I just send the ocean settings in the "begin" message?
                    io.sockets.in(oceanName).emit('begin', 'Beginning first season');
                    io.sockets.in(oceanName).emit('gamesettings', ocean);
                }
            } else if (ocean.status == 'running') {
                ocean.currentSeconds += 1;
                if (ocean.seasonDuration <= ocean.currentSeconds) {
                    ocean.status = 'resting';
                    ocean.currentSeconds = 0;
                    for (i = 0; i < ocean.players.length; i++) {
                        ocean.players[i].status = 'At port';
                        ocean.players[i].actualCasts = 0;
                    }
                    ocean.seasonsData[ocean.currentSeason].endFish = ocean.certainFish + ocean.actualMysteryFish;
                    if (ocean.currentSeason < ocean.totalSeasons) {
                        console.log('Season ended on gameroom ' + oceanName + ', beginning rest period.');
                        logs[oceanName] += new Date().toString() + ", Season ended; beginning rest period.\n";
                        io.sockets.in(oceanName).emit('gamesettings', ocean);
                        io.sockets.in(oceanName).emit('endseason', ocean.currentSeason);
                    } else {
                        ocean.endSimulation();
                    }
                } else {
                    console.log('Seconds in season for gameroom ' + oceanName + ': ' + ocean.currentSeconds);
                    io.sockets.in(oceanName).emit('time', ocean.currentSeconds);
                    for (i = 0; i < ocean.players.length; i++) {
                        if (ocean.players[i].type == 'ai') {
                            aiActions(ocean, oceanName, i);
                        }
                        if (ocean.players[i].status == 'At sea') {
                            ocean.players[i].money -= ocean.costAtSea;
                            ocean.players[i].endMoneyPerSeason[ocean.currentSeason] = ocean.players[i].money;
                        }
                    }
                    io.sockets.in(oceanName).emit('gamesettings', ocean);
                }
            } else if (ocean.status == "resting") {
                ocean.currentSeconds += 1;
                if (ocean.restDuration <= ocean.currentSeconds) {
                    ocean.certainFish = Math.min(ocean.certainFish * ocean.spawnFactor, ocean.startingFish);
                    ocean.actualMysteryFish = Math.min(ocean.actualMysteryFish * ocean.spawnFactor, ocean.startingMysteryFish);
                    ocean.status = 'running';
                    ocean.currentSeconds = 0;
                    ocean.currentSeason += 1;
                    ocean.seasonsData[ocean.currentSeason].initialFish = ocean.certainFish + ocean.actualMysteryFish;
                    for (i = 0; i < ocean.players.length; i++) {
                        ocean.players[i].fishCaughtPerSeason[ocean.currentSeason] = 0;
                        ocean.players[i].startMoneyPerSeason[ocean.currentSeason] = ocean.players[i].money;
                        ocean.players[i].endMoneyPerSeason[ocean.currentSeason] = ocean.players[i].money;
                        ocean.players[i].greedPerSeason[ocean.currentSeason] = seasonGreed(ocean.players[i].greediness, ocean.greedUniformity, ocean.currentSeason, ocean.totalSeasons);

                        if (ocean.players[i].type == 'ai') {
                            ocean.players[i].intendedCasts = seasonCasts(ocean.players[i].greedPerSeason[ocean.currentSeason], ocean.players.length, ocean.certainFish, ocean.actualMysteryFish, ocean.spawnFactor, ocean.chanceOfCatch);
                        }					}
                    console.log('Beginning new season in gameroom ' + oceanName);
                    logs[oceanName] += new Date().toString() + ", Beginning new season.\n";
                    io.sockets.in(oceanName).emit('begin', 'New season');
                } else {
                    console.log('Seconds since resting in gameroom ' + oceanName + ': ' + ocean.currentSeconds);
                    io.sockets.in(oceanName).emit('resttime', ocean.currentSeconds);
                    io.sockets.in(oceanName).emit('gamesettings', ocean);
                }
            } else if (ocean.status == "paused") {
                console.log("Gameroom " + oceanName + " paused by user.");
            } else {
                // Weird state
                console.log("Game state unaccounted for: " + ocean.status);
            }
        } else {
            console.log('Waiting for players in gameroom ' + oceanName);
        }
    }