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