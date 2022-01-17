function (event) {
                var gameStore, playerStore, playoffSeriesStore, scheduleStore, teamStore;

                console.log("Upgrading league" + lid + " database");

                g.dbl = event.target.result;

                // rid ("row id") is used as the keyPath for objects without an innate unique identifier
                playerStore = g.dbl.createObjectStore("players", {keyPath: "pid", autoIncrement: true});
                teamStore = g.dbl.createObjectStore("teams", {keyPath: "rid", autoIncrement: true});
                gameStore = g.dbl.createObjectStore("games", {keyPath: "gid"});
                scheduleStore = g.dbl.createObjectStore("schedule", {keyPath: "gid", autoIncrement: true});
                playoffSeriesStore = g.dbl.createObjectStore("playoffSeries", {keyPath: "season"});
                // ... other stores go here later

                playerStore.createIndex("tid", "tid", {unique: false});
                playerStore.createIndex("draftYear", "draftYear", {unique: false});
                playerStore.createIndex("ratings.season", "ratings.season", {unique: false});
                playerStore.createIndex("statsTids", "statsTids", {unique: false, multiEntry: true});
//                playerStore.createIndex("stats.season", "stats.season", {unique: false, multiEntry: true});
//                playerStore.createIndex("stats.playoffs", "stats.playoffs", {unique: false, multiEntry: true});
                teamStore.createIndex("tid", "tid", {unique: false});
                teamStore.createIndex("cid", "cid", {unique: false});
                teamStore.createIndex("did", "did", {unique: false});
                teamStore.createIndex("season", "season", {unique: false});
//                teamStore.createIndex("stats.playoffs", "stats.playoffs", {unique: false});
//                gameStore.createIndex("tid", "tid", {unique: false}); // Not used because it's useless without oppTid checking too
                gameStore.createIndex("season", "season", {unique: false});
            }