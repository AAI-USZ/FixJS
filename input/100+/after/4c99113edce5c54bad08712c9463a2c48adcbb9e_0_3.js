function engine(io) {
    // The array "oceans" holds all active simulations. If one simulation group has more than one ocean, then
    // there is one entry for each ocean in this array.
    // Oceans are indexed by their name.
    var oceans = new Array();

    // The "oceanGroups" object holds all active simulation groups. Every oceanGroup has at least one ocean.
    // Every ocean has a single corresponding oceanGroup entry.
    var oceanGroups = {};

    var logs = new Array();
    var timestamper = new Date();
    var group;
    var t;  // timer function variable
    var timerIsRunning = false;
    var keepTimerGoing = true;

    function timer() {
        // This function looks for "timable" simulations (those currently having action of any kind),
        // and sends them to timeStep every second.
        // When there are no more simulations to timestep, it wraps its own cycle up.
        if (keepTimerGoing) {
            keepTimerGoing = false;
            for (game in oceans) {
                if (oceans[game].timable == true) {
                    keepTimerGoing = true;
                    timeStep(game);
                }
            }
            t = setTimeout(timer, 1000);
        } else {
            console.log('Finishing timer---we are done.');
            timerIsRunning = false;
        }
    }

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

    function checkForDepletion(g, gameRoom) {
        if (g.certainFish + g.actualMysteryFish <= 0) {
            g.depleted = true;
            g.endSimulation();
        }
    }

    function tryToFish(g, gameRoom, index, name) {
        console.log("A fisher tried to fish: " + name + ", gameroom " + gameRoom + ".");
        var player = g.players[index];
        player.money -= g.costCast;
        player.actualCasts++;
        if ((g.certainFish + g.actualMysteryFish > 0) && Math.random() <= g.chanceOfCatch) {
            logs[gameRoom] += new Date().toString() + ", Fisher " + name + " tried to fish successfully.\n";
            player.money += g.valueFish;
            player.fishCaught++;
            player.fishCaughtPerSeason[g.currentSeason]++;
            player.endMoneyPerSeason[g.currentSeason] = player.money;

            if (Math.floor(Math.random() * (g.certainFish + g.actualMysteryFish)) < g.certainFish) {
                g.certainFish -= 1;
            } else {
                g.actualMysteryFish -= 1;
            }
            checkForDepletion(g, gameRoom);
        } else {
            logs[gameRoom] += new Date().toString() + ", Fisher " + name + " tried to fish unsuccessfully.\n";
        }
    }

    function aiActions(g, gameName, agentID) {
        var doSomething = true;
        if (g.erratic) {
            doSomething = (Math.random() < g.hesitation);
        }
        if (doSomething) {
            agent = g.players[agentID];
            if ((agent.intendedCasts > agent.actualCasts) && (agent.status == 'At port') && (g.certainFish + g.actualMysteryFish > 0)) {
                console.log("A player sailed to sea: " + agent.name + ", gameroom " + gameName + ".");
                logs[gameName] += new Date().toString() + ", Fisher " + agent.name + " sailed to sea.\n";
                agent.status = 'At sea';
                agent.money -= g.costDepart;
                agent.endMoneyPerSeason[g.currentSeason] = agent.money;
            } else if ((agent.intendedCasts > agent.actualCasts) && (agent.status == 'At sea') && (g.certainFish + g.actualMysteryFish > 0)) {
                for (castAttempts = 0; castAttempts < Math.min(g.castsPerSecond, agent.intendedCasts - agent.actualCasts); castAttempts++) {
                    if (Math.random() < g.castingProbability) {
                        tryToFish(g, gameName, agentID, agent.name);
                    }
                }
            } else if (((agent.intendedCasts <= agent.actualCasts) || (g.certainFish + g.actualMysteryFish <= 0)) && agent.status == 'At sea') {
                agent.status = 'At port';
                console.log(logs[gameName]);
                logs[gameName] += new Date().toString() + ", Fisher " + agent.name + " returned to port.\n";
            }
            io.sockets.in(gameName).emit('gamesettings', g);
        }
    }

    function seasonGreed (overallGreed, greedUniformity, currentSeason, totalSeasons) {
        var currentGreed = overallGreed;
        var lowBound = overallGreed;
        var highBound = overallGreed;
        var increment = 0.0;
        if (overallGreed < 0.5) {
            lowBound = overallGreed / 2.0;
            highBound = overallGreed + lowBound;
        } else {
            highBound = ((1.0 - overallGreed) / 2.0) + overallGreed;
            lowBound = 2.0 * overallGreed - highBound;
        }

        increment = (highBound - lowBound) /  (1.0 * (totalSeasons - 1));
        if (totalSeasons > 1) {
            if (greedUniformity == -1) {
                currentGreed = highBound - (increment * (currentSeason - 1));
            } else if (greedUniformity == 1) {
                currentGreed = lowBound + (increment * (currentSeason - 1));
            }
        }
        return currentGreed;
    }

    function seasonCasts (currentGreed, expectedPlayers, startingFish, actualMysteryFish, spawnFactor, chanceOfCatch) {
        return Math.round(((startingFish + actualMysteryFish - ((startingFish + actualMysteryFish) / spawnFactor)) / expectedPlayers) * 2 * currentGreed / chanceOfCatch);;
    }

    function aiAgent (name, greed, expectedPlayers, startingFish, actualMysteryFish, spawnFactor, chanceOfCatch, greedUniformity, totalSeasons) {
        this.name = name;
        this.type = 'ai';
        this.greediness = greed;
        this.fishCaught = 0;
        this.fishCaughtPerSeason = new Array();
        this.startMoney = 100;
        this.money = 100;
        this.startMoneyPerSeason = new Array();
        this.endMoneyPerSeason = new Array();
        this.greedPerSeason = new Array();
        this.status = 'At port';
        var cGreed = seasonGreed(greed, greedUniformity, 1, totalSeasons);
        this.greedPerSeason[1] = cGreed;
        this.intendedCasts = seasonCasts(cGreed, expectedPlayers, startingFish, actualMysteryFish, spawnFactor, chanceOfCatch);
        this.actualCasts = 0;
        this.readRules = true;
    }

    function humanAgent (name) {
        this.name = name;
        this.type = 'human';
        this.greediness = null;
        this.fishCaught = 0;
        this.fishCaughtPerSeason = new Array();
        this.startMoney = 100;
        this.money = 100;
        this.startMoneyPerSeason = new Array();
        this.endMoneyPerSeason = new Array();
        this.greedPerSeason = new Array();
        this.status = 'At port';
        this.actualCasts = 0;
        this.readRules = false;
    }

    function seasonData (number) {
        this.number = number;
        this.initialFish = 0;
        this.endFish = 0;
    }

    function Parent (parentName, numOceans) {
        this.name = parentName;
        this.numOceans = numOceans;
    }

    function gameState (gs) {
        this.status = "waiting";
        this.actualPlayers = 0;
        this.actualHumans = 0;
        this.timable = true;
        this.currentSeason = 0;
        this.currentSeconds = 0;
        this.debug = true;
        this.unpauseState = "";
        this.pausedBy = null;
        this.depleted = false;
        this.certainFish = gs.startingFish;
        this.mysteryFish = gs.startingMysteryFish;

        // gameState for all agents
        this.players = new Array();
        for (i = 0; i < gs.expectedPlayers - gs.expectedHumans; i++) {
            this.players[i] = new aiAgent(gs.robots[i].name, gs.robots[i].greed, gs.expectedPlayers,
                gs.startingFish, gs.startingMysteryFish, gs.spawnFactor, gs.chanceOfCatch, gs.greedUniformity,
                gs.totalSeasons);
            gs.actualPlayers++;
        }

        // seasons data
        this.seasonsData = new Array();
        for (i = 1; i <= this.totalSeasons; i++) {
            this.seasonsData[i] = new seasonData(i);
        }

    }

    function gameParameters (gs, parentName) {
        this.name = parentName;
        this.parent = parentName;
        this.players = new Array();         // gameState
        this.seasonsData = new Array();     // gameState
        this.actualPlayers = 0;             // gameState
        this.actualHumans = 0;              // gameState
        this.timable = true;                // gameState
        this.currentSeason = 0;             // gameState
        this.status = "waiting";            // gameState
        this.currentSeconds = 0;            // gameState
        this.debug = true;                  // gameState
        this.unpauseState = "";             // gameState
        this.pausedBy = null;               // gameState
        this.depleted = false;              // gameState

        this.endSimulation = endSimulation;
        this.allPlayersLoaded = allPlayersLoaded;
        this.isNotOver = isNotOver;
        this.isWaiting = isWaiting;
        this.isReadying = isReadying;

        if (gs != null) {
            this.numOceans = gs.numOceans;
            this.expectedPlayers = gs.numFishers;
            this.expectedHumans = gs.numHumans;
            this.totalSeasons = gs.numSeasons;
            this.seasonDuration = gs.seasonDuration;
            this.initialDelay = gs.initialDelay;
            this.restDuration = gs.restDuration;
            this.spawnFactor = gs.spawnFactor;
            this.chanceOfCatch = gs.chanceOfCatch;
            this.costDepart = gs.costDepart;
            this.costAtSea = gs.costAtSea;
            this.costCast = gs.costCast;
            this.valueFish = gs.valueFish;
            this.startingFish = gs.certainFish;
            this.certainFish = gs.certainFish;                  // gameState
            this.mysteryFish = gs.mysteryFish;
            this.startingMysteryFish = gs.actualMysteryFish;
            this.actualMysteryFish = gs.actualMysteryFish;      // gameState
            this.showOtherFishers = gs.showOtherFishers;
            this.showFisherNames = gs.showFisherNames;
            this.showFisherStatus = gs.showFisherStatus;
            this.showFishCaught = gs.showFishCaught;
            this.showBalance = gs.showBalance;
            this.pauseEnabled = gs.pauseEnabled;
            this.greedUniformity = gs.greedUniformity;
            this.erratic = gs.erratic;
            this.hesitation = gs.hesitation;
            this.castsPerSecond = gs.castsPerSecond;
            this.castingProbability = gs.castingProbability;
            this.prepText = gs.prepText;
            this.depletedText = gs.depletedText;
            this.endText = gs.endText;
            for (i = 0; i < this.expectedPlayers - this.expectedHumans; i++) {
                this.players[i] = new aiAgent(gs.robots[i].name, gs.robots[i].greed, this.expectedPlayers,
                    this.startingFish, this.actualMysteryFish, this.spawnFactor, this.chanceOfCatch, this.greedUniformity, this.totalSeasons);
                this.actualPlayers++;
            }
        } else {
            this.numOceans = 1;
            this.expectedPlayers = 4;
            this.expectedHumans = 1;
            this.totalSeasons = 4;
            this.seasonDuration = 60;
            this.initialDelay = 5;
            this.restDuration = 10;
            this.spawnFactor = 4.00;
            this.chanceOfCatch = 1.00;
            this.costDepart = 0;
            this.costAtSea = 0;
            this.costCast = 0;
            this.valueFish = 3;
            this.startingFish = 40;
            this.certainFish = 40;
            this.mysteryFish = 10;
            this.startingMysteryFish = 5;
            this.actualMysteryFish = 5;
            this.showOtherFishers = true;
            this.showFisherNames = true;
            this.showFisherStatus = true;
            this.showFishCaught = true;
            this.showBalance = true;
            this.pauseEnabled = true;
            this.greedUniformity = 0;
            this.erratic = true;
            this.hesitation = 0.4;
            this.castsPerSecond = 3;
            this.castingProbability = 0.8;
            this.prepText = "FISH simulates fishing in an ocean. You and the other fishers are the only fishers " +
                "in this ocean. All the fishers see the same ocean that you do. At the beginning, the " +
                "number of fish will be displayed on the screen. However, sometimes there is some " +
                "uncertainty about the number of fish. In those cases, 'mystery fish' will be shown on " +
                "the screen as well, and the number is displayed as a certain range, not as an absolute " +
                "number. Once the simulation begins, you and the other fishers may catch as many of these " +
                "fish as you like. Once  you have taken as many fish as you want, you return to port " +
                "with your catches, and the first season ends. Then the fish spawn for the next season, " +
                "if any are left to spawn (if no fish are left, they cannot spawn). For every fish left " +
                "at the end of one season, two fish will be available to be caught in the next season. " +
                "However, because the ocean can support only so many fish, the total number of fish will " +
                "never exceed the original number of fish. Fishing can go on this way for many seasons, " +
                "but all fishing permanently ceases any time that all the fish are caught.\n\n" +
                "You can make money fishing. You will be paid $5 for every fish you catch. (For now, " +
                "this is 'play' money...but please treat it as if it were real money.)\n\n" +
                "Your job is to consider all these factors, and the other fishers, and make your own " +
                "decisions about how to fish. Fish however you wish.\n\n" +
                "Please ask if anything is unclear. We want you to fully understand the rules before you " +
                "start fishing.\n\n" +
                "If you are sure you understand all the above, you are ready to fish. Click on the Go " +
                "Fishing button on the left when you are ready. Once all the fishers have clicked this button, " +
                "the first season will begin. (You may have to wait briefly for all the others fishers " +
                "to click the button.)";
            this.depletedText = "All the fish are gone!";
            this.endText = "Seasons come and seasons go, but for now it seems we're done.";
            robotNames = new Array();
            robotNames[0] = "Leonardo";
            robotNames[1] = "Michelangelo";
            robotNames[2] = "Raphael";
            robotNames[3] = "Donatello";
            for (i = 0; i < this.expectedPlayers - this.expectedHumans; i++) {
                this.players[i] = new aiAgent(robotNames[i], 0.5, this.expectedPlayers, this.startingFish, this.actualMysteryFish, this.spawnFactor, this.chanceOfCatch, this.greedUniformity, this.totalSeasons);
                this.actualPlayers++;
            }
        }
        for (i = 1; i <= this.totalSeasons; i++) {
            this.seasonsData[i] = new seasonData(i);
        }
    }

    // Attached to gameParameters
    function endSimulation() {
        // Wrap it up for this simulation
        this.timable = false;
        this.status = "over";
        console.log(this.name + ": Simulation ended.");
        logs[this.name] += new Date().toString() + ", Simulation ended.\n";
        io.sockets.in(this.name).emit('gamesettings', this);
        io.sockets.in(this.name).emit('gameover', this);

        // Create a log file for this ocean run.
        logRun(this, this.name);
    }

    // Attached to gameParameters
    function allPlayersLoaded() {
        return (this.actualPlayers == this.expectedPlayers);
    }

    // Attached to gameParameters
    function isNotOver() {
        return (this.status != "over");
    }

    // Attached to gameParameters
    function isWaiting() {
        return (this.status == "waiting");
    }

    // Attached to gameParameters
    function isReadying() {
        return (this.status == "readying");
    }



    function allocateFisherToOcean(parent) {
        var availableOcean = "";
        for (i = 1; i <= oceanGroups[parent].numOceans; i++) {
            oID = parent + "-" + (1000 + i).toString().substr(1);
            if (oceans[oID].actualHumans < oceans[oID].expectedHumans) {
                availableOcean = oID;
                break;
            }
        }
        return availableOcean;
    }

    function recreateSimulationsList() {
        runningSims = "<ul>";
        for (parent in oceanGroups) {
            runningSims += "<li><b>" + parent + "</b>, with " + oceanGroups[parent].numOceans + " ocean(s).</li>";
        }
        runningSims += "</ul>"
    }

    io.sockets.on('connection', function (socket) {
        var oceanID = "";

        // Creating a group from newgroup.html
        socket.on('create group', function (gs) {
            console.log("Attempting to create group " + gs.name);
            if (gs.name in oceanGroups) {
                console.log("Group " + group + " already exists. No action taken.");
                socket.emit("group-not-created");
            } else {
                oceanGroups[gs.name] = new Parent(gs.name, gs.numOceans);
                recreateSimulationsList();
                for (ocean = 1; ocean <= gs.numOceans; ocean++) {
                    oceanID = gs.name + "-" + (1000 + ocean).toString().substr(1);
                    oceans[oceanID] = new gameParameters(gs, oceanID);
                    logs[oceanID] = new Date().toString() +  ", Simulation created from newgroup page.\n";
                }
                console.log("New group added, and parameters created: " + gs.name);
                socket.emit("group-created");
            }
        });

        // Responding to main.html
        var myID;
        socket.on('join group', function (group, pid) {
            if (group in oceanGroups) {
                console.log("Group " + group + " already exists; user joined.");
            } else {
                oceanGroups[group] = new Parent(group, 1);
                recreateSimulationsList();
                oceanID = group + "-001";
                oceans[oceanID] = new gameParameters(null, oceanID);
                logs[oceanID] = new Date().toString() +  ", Simulation created from fish page.\n";
                console.log("New group added, and parameters created: " + group);
            }
            io.sockets.in(oceanID).emit("join", "A player joined this group.");

            if (oceanID == "") {
                oceanID = allocateFisherToOcean(group);
            }

            if (oceanID == "") {
                // The only way we can end here is if the group is already full.
                console.log("User tried to join a group that is already full.");
                socket.emit('fullroom', group);
            } else {
                socket.set('group', oceanID,
                    function() {
                        socket.emit("myGroup", oceanID);
                    }
                );
                socket.join(oceanID);

                oceans[oceanID].players[oceans[oceanID].actualPlayers] = new humanAgent(pid);
                logs[oceanID] += new Date().toString() + ", Fisher " + pid + " joined this simulation.\n";
                myID = oceans[oceanID].actualPlayers++;
                oceans[oceanID].actualHumans++;
                io.sockets.in(oceanID).emit("gamesettings", oceans[oceanID]);

                socket.set('gamesettings', oceans[oceanID],
                    function() {
                        socket.emit('gamesettings', oceans[oceanID]);
                    }
                );

                socket.set('gamestate', oceans[oceanID],
                    function() {
                        socket.emit('gamestate', oceans[oceanID]);
                    }
                );

                socket.set('myID', myID,
                    function() {
                        socket.emit('myID', myID);
                    }
                );

                socket.on('pauseRequest',
                    function (data) {
                        console.log("A player requested to pause the simulation: " + data.id + ", gameroom " + oceanID + ".");
                        if ((oceans[oceanID].status == "running") || (oceans[oceanID].status == "resting")) {
                            oceans[oceanID].unpauseState = oceans[oceanID].status;
                            oceans[oceanID].status = "paused";
                            oceans[oceanID].pausedBy = data.id;
                            console.log("Simulation '" + oceanID + "' paused by player " + oceans[oceanID].players[data.id].name);
                            logs[oceanID] += new Date().toString() + ", Simulation paused by fisher " + oceans[oceanID].players[data.id].name + ".\n";
                            io.sockets.in(oceanID).emit("paused", {id: data.id});
                            io.sockets.in(oceanID).emit('gamesettings', oceans[oceanID]);
                        } else {
                            console.log("The simulation '" + oceanID + "' was not in a pausable state.");
                        }
                    }
                );

                socket.on('resumeRequest',
                    function (data) {
                        console.log("A player requested to resume the simulation: " + oceans[oceanID].players[data.id].name + ", gameroom " + oceanID + ".");
                        if (oceans[oceanID].status == "paused" && oceans[oceanID].pausedBy == data.id) {
                            oceans[oceanID].status = oceans[oceanID].unpauseState;
                            io.sockets.in(oceanID).emit("resumed", {id: data.id});
                            io.sockets.in(oceanID).emit('gamesettings', oceans[oceanID]);
                            logs[oceanID] += new Date().toString() + ", Simulation resumed by fisher " + oceans[oceanID].players[data.id].name + ".\n";
                        } else {
                            console.log("The simulation '" + oceanID + "' was not paused, or was paused by someone other than " + oceans[oceanID].players[data.id].name);
                        }
                    }
                );

                socket.on('toSea',
                    function (data) {
                        console.log("A player sailed to sea: " + oceans[oceanID].players[data.id].name + ", gameroom " + oceanID + ".");
                        logs[oceanID] += new Date().toString() + ", Fisher " + oceans[oceanID].players[data.id].name + " sailed to sea.\n";
                        oceans[oceanID].players[data.id].status = 'At sea';
                        oceans[oceanID].players[data.id].money -= oceans[oceanID].costDepart;
                        oceans[oceanID].players[data.id].endMoneyPerSeason[oceans[oceanID].currentSeason] = oceans[oceanID].players[data.id].money;
                        io.sockets.in(oceanID).emit('gamesettings', oceans[oceanID]);
                    }
                );

                socket.on('toPort',
                    function (data) {
                        console.log("A player returned to port: " + oceans[oceanID].players[data.id].name + ", gameroom " + oceanID + ".");
                        logs[oceanID] += new Date().toString() + ", Fisher " + oceans[oceanID].players[data.id].name + " returned to port.\n";
                        oceans[oceanID].players[data.id].status = 'At port';
                        io.sockets.in(oceanID).emit('gamesettings', oceans[oceanID]);
                    }
                );

                socket.on('readRules',
                    function(data) {
                        console.log("A player read the rules and is ready to start: " + oceans[oceanID].players[data.id].name + ", gameroom " + oceanID + ".");
                        logs[oceanID] += new Date().toString() + ", Fisher " + oceans[oceanID].players[data.id].name + " read the rules and is ready to start.\n";
                        oceans[oceanID].players[data.id].readRules = true;
                        allReadRules = true;
                        for (i = 0; i < oceans[oceanID].players.length; i++) {
                            if (oceans[oceanID].players[i].readRules == false) {
                                allReadRules = false;
                            }
                        }
                        if (oceans[oceanID].actualPlayers == oceans[oceanID].expectedPlayers && allReadRules) {
                            oceans[oceanID].status = 'readying';
                            oceans[oceanID].currentSeason = 1;
                            for (i = 0; i < oceans[oceanID].players.length; i++) {
                                oceans[oceanID].players[i].startMoneyPerSeason[1] = oceans[oceanID].players[i].startMoney;
                                oceans[oceanID].players[i].endMoneyPerSeason[1] = oceans[oceanID].players[i].startMoney;
                                oceans[oceanID].players[i].fishCaughtPerSeason[1] = 0;
                            }
                            io.sockets.in(oceanID).emit('gamesettings', oceans[oceanID]);
                            io.sockets.in(oceanID).emit('readying', 'All agents ready - prepare!');
                            logs[oceanID] += new Date().toString() + ", All fishers now ready to start.\n";
                        }
                    }
                );

                socket.on('fishing',
                    function (data) {
                        tryToFish(oceans[oceanID], oceanID, data.id, oceans[oceanID].players[data.id].name);
                        io.sockets.in(oceanID).emit('gamesettings', oceans[oceanID]);
                    }
                );

                // Begin timekeeping
                if (timerIsRunning == false) {
                    timerIsRunning = true;
                    keepTimerGoing = true;
                    timer();
                }
            }
        });
    });

    function individualRestraint(pool, numFishers, fishCaught) {
        return (pool - numFishers * fishCaught) / pool;
    }

    function groupRestraint(pool, endPool) {
        return endPool / pool;
    }

    function individualEfficiency(originalPool, startPool, spawnFactor, numFishers, fishCaught) {
        var ie;
        if (originalPool <= spawnFactor * startPool) {
            // Not endangered
            ie = (startPool - fishCaught * numFishers) * spawnFactor / originalPool;
        } else {
            // Endangered
            ie = (startPool - fishCaught * numFishers) / startPool;
        }
        return ie;
    }

    function groupEfficiency(originalPool, startPool, endPool, spawnFactor) {
        var ge;
        if (originalPool <= spawnFactor * startPool) {
            // Not endangered
            ge = endPool * spawnFactor / originalPool;
        } else {
            // Endangered - unclear if this is the proper interpretation
            ge = endPool / startPool;
        }
        return ge;
    }

    function logRun(g, name) {
        // Write a log of the results of the simulation run
        // g is the game object
        // r is the output string
        var currentTime = new Date();
        var r = "";
        var p;
        r += "FISH simulation log\n";
        r += "-------------------\n\n";

        r += "Run name: " + name + "\n";
        r += "Date and time: " + currentTime.toString() + "\n\n";

        r += "Number of agents: " + g.expectedPlayers + "\n";
        r += "Number of humans: " + g.expectedHumans + "\n";
        r += "Number of seasons: " + g.totalSeasons + "\n";
        r += "Season length (in seconds): " + g.seasonDuration + "\n";
        r += "Delay to begin simulation (in seconds): " + g.initialDelay + "\n";
        r += "Resting time between seasons (in seconds): " + g.restDuration + "\n";
        r += "Spawn factor: " + g.spawnFactor + "\n";
        r += "Chance of catch (0.00 to 1.00): " + g.chanceOfCatch + "\n";
        r += "Cost to depart: " + g.costDepart + "\n";
        r += "Cost per second at sea: " + g.costAtSea + "\n";
        r += "Cost to cast for a fish: " + g.costCast + "\n";
        r += "Value of fish caught: " + g.valueFish + "\n";
        r += "Number of starting certain fish: " + g.startingFish + "\n";
        r += "Number of starting mystery fish: " + g.startingMysteryFish + "\n";
        r += "Number of ending certain fish: " + g.certainFish + "\n";
        r += "Number of ending mystery fish: " + g.actualMysteryFish + "\n";
        r += "Showing other fishers' information?: " + (g.showOtherFishers ? "Yes" : "No") + "\n";
        r += "Showing other fishers' names?: " + (g.showFisherNames ? "Yes" : "No") + "\n";
        r += "Showing other fishers' status?: " + (g.showFisherStatus ? "Yes" : "No") + "\n";
        r += "Showing other fishers' number of fish caught?: " + (g.showFishCaught ? "Yes" : "No") + "\n";
        r += "Showing other fishers' money balance?: " + (g.showBalance ? "Yes" : "No") + "\n\n";

        r += "The following paragraphs were presented to participants as the preparation text:\n";
        r += "--------------------------------------------------------------------------------\n";
        r += g.prepText + "\n";
        r += "--------------------------------------------------------------------------------\n\n";

        r += "Measurements per fisher:\n\n";
        r += "Fisher, Type, Greed, Season, FishInit, FishTaken, Profit, IR, GR, IE, GE\n";
        r += "--------------------------------------------------------------------------------\n";
        for (i = 0; i < g.expectedPlayers; i++) {
            p = g.players[i];
            for (j = 1; j <= g.totalSeasons; j++) {
                r += p.name + ", ";
                r += p.type + ", ";
                r += ((p.type == "ai") ? p.greedPerSeason[j] : "n/a") + ", ";
                r += j + ", ";
                r += g.seasonsData[j].initialFish + ", ";
                r += p.fishCaughtPerSeason[j] + ", ";
                r += (p.endMoneyPerSeason[j] - p.startMoneyPerSeason[j]) + ", ";
                r += individualRestraint(g.seasonsData[j].initialFish, g.expectedPlayers, p.fishCaughtPerSeason[j]) + ", ";
                r += groupRestraint(g.seasonsData[j].initialFish, g.seasonsData[j].endFish) + ", ";
                r += individualEfficiency(g.startingFish + g.startingMysteryFish, g.seasonsData[j].initialFish, g.spawnFactor, g.expectedPlayers, p.fishCaughtPerSeason[j]) + ", ";
                r += groupEfficiency(g.startingFish + g.startingMysteryFish, g.seasonsData[j].initialFish, g.seasonsData[j].endFish, g.spawnFactor) + "\n";
            }
        }
        r += "\n";
        r += "--------------------------------------------------------------------------------\n\n";

        r += "Logged simulation events:\n\n";
        r += logs[name];


        fs.writeFile("data/" + name + ".txt", r, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Simulation run logged under data/" + name + ".txt");
        });

    }
}