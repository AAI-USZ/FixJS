function(data){
        if(WTF.raceStatus === "waiting") {
            WTF.remainingPlayers = WTF.numPlayers - parseInt(data.number);

            WTF.playerThumbs = [];

            for(var i=0; i<data.photos.length; i++) {
                var newImage = new Image();
                newImage.load = function() {
                    WTF.playerThumbs.push(this);
                }
                newImage.src = data.photo;
            }
        }
    }