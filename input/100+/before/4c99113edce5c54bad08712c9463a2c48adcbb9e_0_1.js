function endSimulation(oceanName) {
        // Wrap it up for the simulation named "oceanName"
        g = oceans[oceanName];
        g.timable = false;
        g.status = 'over';
        console.log(oceanName + ": Simulation ended.");
        logs[oceanName] += new Date().toString() + ", Simulation ended.\n";
        io.sockets.in(oceanName).emit('gamesettings', g);
        io.sockets.in(oceanName).emit('gameover', 'gameover');

        // Create a log file for this ocean run.
        logRun(g, oceanName);
    }