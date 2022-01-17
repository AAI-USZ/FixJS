function(data){
        if(WTF.raceStatus === "waiting") {
            var data = JSON.parse(data);

            WTF.remainingPlayers = WTF.numPlayers - parseInt(data.number);

            WTF.users = data.users;
        }
    }